import React from "react";

const NetworkError = ({ retry }) => {
  return (
    <section className=" flex flex-col mx-auto max-w-sm w-full absolute top-[50%] translate-y-[-50%] left-0 right-0 items-center ">
      <i
        className="fal fa-wifi-slash text-8xl text-navy-blue/30 mb-6 "
        aria-hidden="true"
      ></i>
      <div className=" text-xl text-navy-blue font-medium tracking-wide ">
        Network Error {"   "}
        <button className=" underline text-blue-700 " onClick={() => retry()}>
          Retry
        </button>
      </div>
    </section>
  );
};

export default NetworkError;
