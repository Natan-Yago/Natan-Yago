import Hero from "./components/sections/hero";
import SelectedProjects from "./components/sections/selected-projects";
import WorkExperience from "./components/sections/work-experience";
import Connect from "./components/sections/connect";
import GridTest from "./components/sections/grid-test";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedProjects />
      <WorkExperience />
      <Connect />
    </>
  );
}
