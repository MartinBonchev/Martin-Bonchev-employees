import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainPage />} path=""></Route>
      </Routes>
    </Router>
  );
}
