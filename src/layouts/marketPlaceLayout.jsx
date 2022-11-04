import React from "react";
import { Outlet } from "react-router-dom";

const MarketPlaceLayout = () => {
  return (
    <section className=" relative min-h-[100vh] sm:min-h-[100vh] ">
      <div className=" py-8 relative max-w-lg mx-auto md:mx-8 lg:mx-12 lg:max-w-none flex gap-12 items-center ">
        <h3 className=" text-4xl font-medium md:mx-8 lg:mx-12 text-center w-full text-navy-blue ">
          Mart
        </h3>
      </div>

      <Outlet />
    </section>
  );
};

export default MarketPlaceLayout;
