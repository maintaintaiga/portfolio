import { Route, Routes } from "react-router-dom";

import { Home } from "../screens/home";
import { About } from "../screens/about";
import { Projects } from "../screens/projects";
import { Contact } from "../screens/contact";
import { Navigation } from "../components/navigation";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};
