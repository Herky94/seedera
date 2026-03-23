import ProjectDetailClient from "./ProjectDetailClient";
import { PROJECTS } from "./projectsData";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage() {
  return <ProjectDetailClient />;
}
