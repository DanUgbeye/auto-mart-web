import React from "react";
import { Outlet } from "react-router-dom";
import Heading from "../components/heading";

const Adverts = () => {
  return (
    <section className="relative min-h-[calc(100vh-3rem)] sm:min-h-[100vh] ">
      <Heading
        heading={"Adverts"}
        supportText={"find created adverts or create a new one"}
        extraStyle={
          " px-8 py-2 text-primary-red-60 sticky top-0 left-0 right-0 z-[1000] bg-primary-light-30 shadow-black/10 shadow-md relative "
        }
        headingStyle={" text-4xl mb-2  "}
        supportTextStyle={" text-lg "}
      />

      <Outlet />
    </section>
  );
};

export default Adverts;
