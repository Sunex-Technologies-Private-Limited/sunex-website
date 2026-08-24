# Deployment Strategy

The Sunex Website is deployed as a single, unified Docker container. This ensures that the Node.js frontend/backend and the .NET Core backend are perfectly synchronized and scaled together.

## Containerization (The `Dockerfile`)

Our deployment relies on a multi-stage `Dockerfile` located at the root of the project.

**Build Stages:**
1.  **`dotnet-builder`:** Restores and publishes the .NET 8 application in `Release` mode.
2.  **`node-builder`:** Installs Node dependencies via `pnpm`, builds the Vite frontend, and compiles the TRPC Node server using `esbuild`.
3.  **`runtime`:** An `aspnet:8.0-bookworm-slim` base image that installs Node.js. It copies the artifacts from both builders, sets up a secure, non-root `sunex` user, and executes `scripts/start-production.sh`.

### Node Server vs .NET API Host

> [!NOTE]
> Both the Node server and the .NET API run on the **same box (container)** in production. 

The `start-production.sh` script boots both the Node server and the .NET API in the background. Node connects to the .NET API via localhost (`http://127.0.0.1:5090`). This entirely eliminates network latency between the two backend layers.

## Deployment Triggers (CI/CD)

Deployments are typically handled by a CI/CD pipeline (e.g., GitHub Actions, GitLab CI).

1.  **Trigger:** A merge to the `main` branch.
2.  **Build:** The CI server runs `docker build -t sunex-website .`
3.  **Push:** The built image is pushed to a container registry (e.g., ECR, Docker Hub).
4.  **Deploy:** The hosting provider (e.g., AWS ECS, Google Cloud Run, Azure Container Apps) is signaled to pull the latest image and perform a rolling update.

## Rollback Procedure

If a bad deployment reaches production, standard containerized rollback procedures apply:

1.  **Identify the stable tag:** Find the image tag/hash of the previously successful deployment in your container registry.
2.  **Re-deploy the stable tag:** Force your hosting provider to revert to the old tag. If using AWS ECS, this means reverting the Task Definition to the previous revision. If using a PaaS, there is usually a "Rollback" button in the dashboard.
3.  **Database Rollback:** If the bad deployment included a destructive database migration (`db:push`), you must restore the database from the last automated snapshot taken *prior* to the deployment. Do not attempt to write a reverse migration manually under pressure.
