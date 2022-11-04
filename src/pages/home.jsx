import React from "react";
import { Link } from "react-router-dom";
import Heading from "../components/heading";
import vehicleHero from "../assets/svg/vehicle_sale.svg";

const Home = () => {
  return (
    <main className=" bg-light-sky-blue text-navy-blue min-h-[100vh] h-fit flex flex-col relative ">
      <header className=" flex justify-between px-4 py-4 items-center relative ">
        <h1 className=" text-2xl font-bold  ">
           Auto Mart
        </h1>
      </header>

      <section className=" absolute mx-8 mt-12 left-0 right-0 top-[50%] translate-y-[-50%] flex flex-col lg:flex-row gap-16 lg:gap-8 justify-center items-center ">
        <Heading
          heading={"The trusted platform for buying and selling cars"}
          supportText={
            "Buy and sell automobiles on your device. We offer deliveries anywhere in the world, Literally!"
          }
          extraStyle={"max-w-md w-full order-2 lg:order-1 "}
          headingStyle={"text-4xl lg:text-5xl text-left font-bold "}
          supportTextStyle={"text-left text-[#827C90] text-xl"}
        >
          <div className=" flex gap-8 mt-8 ">
            <Link
              to="/signup"
              className=" px-4 py-2 text-lg flex justify-center items-center bg-navy-blue rounded-md tracking-widest text-white hover:bg-navy-blue-90 "
            >
              SIGN UP
            </Link>
            
            <Link
              to="/login"
              className=" px-4 py-2 text-lg flex justify-center items-center rounded-md tracking-widest border-solid border border-navy-blue hover:border-navy-blue-90 hover:text-navy-blue-90 "
            >
              LOGIN
            </Link>
          </div>
        </Heading>

        <img
          src={vehicleHero}
          alt="car sale"
          className=" max-w-md w-full mt-8 order-1 lg:order-2 "
        />
      </section>
    </main>
  );
};

export default Home;
