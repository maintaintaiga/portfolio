import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/homepage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
