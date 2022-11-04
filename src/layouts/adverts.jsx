import React from "react";
import { Outlet } from "react-router-dom";
import Heading from "../components/heading";

const Adverts = () => {
  return (
    <section className="relative min-h-[100vh] sm:min-h-[100vh] ">
      <Outlet />
    </section>
  );
};

export default Adverts;
