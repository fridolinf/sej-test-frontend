import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.min.css";
import App from "./App";
import Bookmark from "./Bookmark";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayout from "./components/HeaderLayout";
import FooterLayout from "./components/FooterLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HeaderLayout />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="bookmark" element={<Bookmark />} />
    </Routes>
    <FooterLayout />
  </BrowserRouter>
);
