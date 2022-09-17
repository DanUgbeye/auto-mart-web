import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const SecondaryLayout = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <section className=" bg-primary-light-30 relative  ">
      <div className=" z-[1002] bg-primary-light-30 items-center flex border-b border-primary-red-60 w-full sm:hidden h-12  ">
        <Link
          to="/"
          className={" text-xl font-bold text-primary-red-60 my-8 w-fit ml-6  "}
        >
          Auto Mart
        </Link>
      </div>

      <button
        className={` fixed z-[1001] w-fit h-fit right-8 top-[3.7rem] sm:hidden p-4 `}
        onClick={() => setNavExpanded(!navExpanded)}
      >
        <i
          className={`a far ${
            !navExpanded ? "fa-bars" : "fa-close"
          }  text-4xl text-primary-red-60 `}
        />
      </button>

      <div className="  grid sm:grid-cols-[12.5rem_auto] relative ">
        <Navbar
          extraStyle=" absolute sm:block top-0 w-[16rem] min-h-[calc(100vh-3rem)] sm:min-h-[100vh] sm:w-[12.5rem] sm:col-start-1 sm:col-end-2 bg-primary-red-60 "
          navState={navExpanded}
          setNavExpanded={setNavExpanded}
        />

        <div className=" sm:col-start-2 sm:col-end-3 ">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SecondaryLayout;
