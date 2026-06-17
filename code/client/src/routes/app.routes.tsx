import { Route, Routes } from "react-router";

import { Home } from "../screens/home";
import { About } from "../screens/about";
import { Projects } from "../screens/projects";
import { Contact } from "../screens/contact";
import { Navigation } from "../components/navigation";
import { CVDocument } from "../components/cv";

import type { JSX } from "react";

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cv" element={<CVDocument />} />
      </Route>
    </Routes>
  );
};
