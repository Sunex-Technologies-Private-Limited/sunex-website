/*
 * Search and social-preview text for the SkillConnect Kids pages.
 * The server injects this into index.html so crawlers and link previews (WhatsApp, Facebook) see the right text
 * even though the pages themselves are drawn in the browser. Keep in sync with client/src/data/kidsCourses.ts
 * (a test checks the course ids and titles match).
 */
export type KidsSeoCourse = { id: string; title: string; summary: string; weeks: number; minAge: number };

export const kidsSeoCourses: KidsSeoCourse[] = [
  { id: "scratch", title: "Programming in Scratch", summary: "Learn sequences, loops, decisions, variables and clones by building games and stories.", weeks: 8, minAge: 7 },
  { id: "electricity", title: "Everyday Electricity", summary: "Understand circuits, series and parallel, and home electrical safety, then find out how to waste less energy.", weeks: 6, minAge: 7 },
  { id: "python", title: "Programming in Python", summary: "Move from blocks to real code: variables, loops, lists, functions, files and games.", weeks: 12, minAge: 10 },
  { id: "prompt", title: "Prompt Engineering & AI Literacy", summary: "Learn how AI learns, why it can be wrong, and how to ask clearly, check carefully and use it responsibly.", weeks: 6, minAge: 10 },
  { id: "iot", title: "IoT Basics", summary: "Build smart systems with sensors, rules, data and dashboards in a browser simulator.", weeks: 8, minAge: 9 },
  { id: "robotics", title: "Robotics Basics", summary: "Program virtual robots for motion, sensors, line following and missions, and design real-world robots.", weeks: 10, minAge: 8 },
];

const kidsLanding = {
  title: "SkillConnect Kids",
  description: "Coding, electricity, AI, IoT and robotics courses for children aged 7 to 16. Learn at your own pace with live weekend classes. Book a free demo class.",
};

export function kidsRouteMeta(pathname: string): { title: string; description: string } | null {
  const clean = pathname.replace(/\/+$/, "");
  if (clean === "/education/kids") return kidsLanding;
  const match = clean.match(/^\/education\/kids\/([^/]+)$/);
  const course = match && kidsSeoCourses.find((item) => item.id === match[1]);
  if (!course) return null;
  return {
    title: `${course.title} for Kids (Ages ${course.minAge}–16)`,
    description: `${course.summary} ${course.weeks}-week course with 3 levels. Learn at your own pace plus live weekend classes. Book a free demo class.`,
  };
}

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Returns index.html with the title and description tags swapped for this route, or the original when the route is not a kids page. */
export function injectKidsMeta(html: string, pathname: string): string {
  const meta = kidsRouteMeta(pathname);
  if (!meta) return html;
  const title = escapeHtml(`${meta.title} | Powering the Next Clean Future`);
  const description = escapeHtml(meta.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
}
