import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
export default function BaseLayout() {
  return (
    <>
      <Navbar />
        <div className="container mx-auto">
          <Outlet />
        </div>
      <Footer />
    </>
  );
}
