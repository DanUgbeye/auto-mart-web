import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NetworkError from "../components/networkError";
import RequestTimeout from "../components/requestTimeout";
import { useUser } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";
import Settings from "../utils/settings";

const Buy = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [car, setCar] = useState({});
  const { user, saveUser } = useUser();
  const navigate = useNavigate();
  const [timeout, setTimeout] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const mountedRef = useRef(true);

  const loadCar = useCallback(() => {
    if (!mountedRef.current) return null;
    if (!isLoading) setIsLoading(true);
    API.getCar(id, { signal })
      .then((carData) => {
        if (!mountedRef.current) return null;
        setCar(carData);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!mountedRef.current) return null;
        if (err.message.includes("timeout")) {
          toast.error("Request timed out");
          setTimeout(true);
        } else if (err.message.includes("Authentication error")) {
          // redirect to login
          saveUser({});
          navigate(
            `${Settings.getBaseURL()}/login?redirect=${window.location.href}`,
            { replace: true }
          );
        } else if (err.message === "Network Error") {
          toast.error(err.message);
          setNetworkError(true);
        } else {
          toast.error(err.message);
          setError(err.message);
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    loadCar();
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className=" max-w-6xl m-8 lg:mx-auto flex flex-col  ">
      <div className=" relative mb-8">
        <Link
          to="/marketplace"
          className={` relative left-0 z-[900] flex gap-2 w-fit min-w-[6rem] text-xl hover:text-navy-blue-90 py-2 h-12 rounded-md text-navy-blue justify-center items-center tracking-wider px-2 `}
        >
          <i className=" fa fas fa-angles-left group-focus-visible:mr-2 peer-focus-within:mr-2 " />
          <span className="w-fit">Back</span>
        </Link>
      </div>

      <div
        className={` text-red-400 flex justify-center text-[14px] text-center w-full h-8 ${
          error ? "visible" : "invisible"
        }`}
      >
        {error}
      </div>

      {isLoading && <Loading />}

      {!error && !isLoading && timeout && !networkError && (
        <RequestTimeout retry={loadCar} />
      )}

      {!error && !isLoading && !timeout && networkError && (
        <NetworkError retry={loadCar} />
      )}

      {!error && !isLoading && !timeout && !networkError && (
        <div className=" mx-auto">
          <div className=" flex flex-col md:flex-row gap-8 ">
            {car.image ? (
              <img
                src={car.image.path}
                alt={`${car.manufacturer} ${car.model}`}
                className=" w-full min-h-[15rem] h-fit max-w-md mx-auto md:mx-0 "
              />
            ) : (
              <div className=" bg-navy-blue w-full min-w-[20rem] min-h-[15rem] h-fit max-w-md"></div>
            )}

            <div
              id="car-desc"
              className=" tracking-wider text-lg text-navy-blue-90 w-full font-semibold md:w-full "
            >
              <div className=" flex flex-col gap-4 mb-4 ">
                <div className=" text-xl flex flex-col gap-4 ">
                  <div className="">
                    Manufacturer:{" "}
                    <span className=" font-normal ">{car.manufacturer}</span>
                  </div>
                  <div className="">
                    Model:{" "}
                    <span className=" font-normal ">
                      {car.model.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className=" ">
                  Year: <span className=" font-normal ">{car.year}</span>
                </div>
              </div>
              <div className=" text-xl ">
                Price:{" "}
                <span className=" font-normal ">
                  {car.price.toLocaleString() + " NGN"}
                </span>
              </div>
            </div>
          </div>
          <div className=" my-8 ">
            {user.id !== car.seller ? (
              <button className=" px-4 py-2 text-xl flex justify-center items-center bg-navy-blue rounded-md tracking-widest text-white hover:bg-navy-blue-90 ">
                Buy Car
              </button>
            ) : (
              <div className=" text-navy-blue-90 text-center text-lg font-semibold tracking-wider ">
                * You posted this advert
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
