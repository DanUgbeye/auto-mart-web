import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

const Navbar = ({ extraStyle, navState, setNavExpanded }) => {
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    saveUser({});
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section
      className={` sm:bg-primary-red-60 pl-4 z-[1001] sm:relative  transition-all duration-300 ${extraStyle} ${navState ? "translate-x-0" : "translate-x-[-100%] sm:translate-x-0"}`}
    >
      <div className=" w-fit justify-center ml-6 my-8 hidden sm:flex ">
        <Link
          to="/"
          className={
            " text-2xl font-bold text-white w-fit "
          }
        >
          Auto Mart
        </Link>
      </div>

      <div className="  sm:h-fit bg-primary-red-60 sm:bg-transparent flex flex-col pt-[10rem] sm:fixed left-10 w-[10rem] ">
        <NavLink
          to={"/marketplace"}
          className={({ isActive }) =>
            `  mb-8 px-4 py-2  ${
              isActive
                ? "text-primary-red-60 bg-primary-light-30 rounded-lg sm:rounded-l-lg font-semibold "
                : " bg-primary-red-30 text-primary-light-30 rounded-lg mr-2 hover:bg-white/40 "
            }  `
          }
          onClick={()=>setNavExpanded(false)}
        >
          <i className=" fa far fa-rectangle-list mr-4" />
          Market
        </NavLink>

        <NavLink
          to={"/advert"}
          className={({ isActive }) =>
            `  mb-8 px-4 py-2  ${
              isActive
                ? "text-primary-red-60 bg-primary-light-30 rounded-lg sm:rounded-l-lg font-semibold "
                : " bg-primary-red-30 text-primary-light-30 rounded-lg mr-2 hover:bg-white/40 "
            }  `
          }
          onClick={()=>setNavExpanded(false)}
        >
          <i className=" fa far fa-money-bill-wave mr-4" />
          Adverts
        </NavLink>

        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            `  mb-8 px-4 py-2  ${
              isActive
                ? "text-primary-red-60 bg-primary-light-30 rounded-lg sm:rounded-l-lg font-semibold "
                : " bg-primary-red-30 text-primary-light-30 rounded-lg mr-2 hover:bg-white/40 "
            }  `
          }
          onClick={()=>setNavExpanded(false)}
        >
          <i className=" fa fas fa-user mr-4" />
          Profile
        </NavLink>

        <button
          className="  mb-8 px-4 flex items-center py-2 bg-primary-red-30 text-primary-light-30 rounded-lg mr-2 hover:bg-white/40  "
          onClick={() => logout()}
        >
          <i className="fa far fa-sign-out mr-4 " />
          Log out
        </button>
      </div>
    </section>
  );
};

export default Navbar;
