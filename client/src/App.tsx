import { Toaster } from "@/components/ui/sonner";
import { PageMeta } from "@/components/sunex/PageMeta";
import { RouteScrollManager } from "@/components/sunex/RouteScrollManager";
import { PageShell } from "@/components/sunex/SiteShell";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const NotFound = lazy(() => import("@/pages/NotFound"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Education = lazy(() => import("@/pages/Education"));
const Faq = lazy(() => import("@/pages/Faq"));
const Healthcare = lazy(() => import("@/pages/Healthcare"));
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/Product"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Services = lazy(() => import("@/pages/Services"));
const Technology = lazy(() => import("@/pages/Technology"));

function Router() {
  return (
    <PageShell>
      <RouteScrollManager />
      <PageMeta />
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite"><span /><p>Preparing the next SunEx experience.</p></div>}><Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/technology" component={Technology} />
        <Route path="/product" component={Product} />
        <Route path="/urbantree" component={Product} />
        <Route path="/education" component={Education} />
        <Route path="/healthcare" component={Healthcare} />
        <Route path="/faq" component={Faq} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/service" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch></Suspense>
    </PageShell>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Toaster /><Router /></ThemeProvider></ErrorBoundary>;
}
