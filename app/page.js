import Hero from "./components/sections/hero";
import SelectedProjects from "./components/sections/selected-projects";
import MobileProjectsCarousel from "./components/sections/mobile-projects-carousel";
import WorkExperience from "./components/sections/work-experience";
import Connect from "./components/sections/connect";
import GridTest from "./components/sections/grid-test";
import Skills from "./components/sections/skills";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Mobile carousel first, visible only on small screens */}
      <MobileProjectsCarousel />
      {/* Desktop/tablet grid version */}
      <div className="hidden md:block">
        <SelectedProjects />
      </div>
      <WorkExperience />
      <Skills />
      <Connect />
    </>
  );
}
