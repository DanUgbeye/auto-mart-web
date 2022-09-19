import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const SecondaryLayout = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <section className=" relative  ">
      <div className=" z-[1001] bg-light-sky-blue items-center flex border-b border-navy-blue w-full sm:hidden sticky top-0 left-0 right-0 h-16  ">
        <Link
          to="/"
          className={" text-xl font-bold text-navy-blue w-fit ml-6  "}
        >
          Auto Mart
        </Link>
      </div>

      <button
        className={` fixed z-[1002] w-fit h-fit right-8 top-[.5rem] sm:hidden p-2 `}
        onClick={() => setNavExpanded(!navExpanded)}
      >
        <i
          className={`a far ${
            !navExpanded ? "fa-bars" : "fa-close"
          }  text-3xl text-navy-blue `}
        />
      </button>

      <div className="  grid sm:grid-cols-[12.5rem_auto] relative ">
        <Navbar
          extraStyle=" absolute sm:block top-0 bottom-0 w-[16rem] min-h-[100vh] sm:min-h-[100vh] sm:w-[12.5rem] sm:col-start-1 sm:col-end-2 bg-navy-blue "
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
