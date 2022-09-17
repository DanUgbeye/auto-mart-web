import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" absolute top-[50%] translate-y-[-50%] w-full min-h-[80vh] text-primary-red-60 flex flex-col justify-center items-center ">

      <div className=" flex items-center mb-2 ">
        <span className=" text-5xl pr-2 mr-2 font-semibold border-r-2 border-solid border-primary-red-60 ">
          404
        </span>
        <span className=" text-2xl ">Page Not Found</span>
      </div>

      <small>The page you are looking for does not exist</small>
      
      <Link
        to="/"
        className=" mt-8 border-2 border-solid border-primary-red-60 px-4 py-2 rounded-md "
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
