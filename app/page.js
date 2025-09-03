import Hero from "./components/sections/hero";
import SelectedProjects from "./components/sections/selected-projects";
import MobileProjectsCarousel from "./components/sections/mobile-projects-carousel";
import WorkExperience from "./components/sections/work-experience";
import Connect from "./components/sections/connect";
import Skills from "./components/sections/skills";
import { listWork } from "./lib/work";

export default async function Home() {
  const featured = await listWork({ featuredOnly: true });

  return (
    <>
      <Hero />
      {/* Mobile carousel first, visible only on small screens */}
      <MobileProjectsCarousel projects={featured} />
      {/* Desktop/tablet grid version */}
      <div className="hidden md:block">
        <SelectedProjects projects={featured} />
      </div>
      <WorkExperience />
      <Skills />
      <Connect />
    </>
  );
}
