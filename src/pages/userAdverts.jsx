import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { useUser } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";
import Settings from "../utils/settings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestTimeout from "../components/requestTimeout";
import NetworkError from "../components/networkError";

const UserAdverts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const { user, saveUser } = useUser();
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;

  // errors
  const [error, setError] = useState("");
  const [timeout, setTimeout] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const mountedRef = useRef(true);

  const loadUserCars = useCallback(() => {
    if (!mountedRef.current) return null;
    if (!isLoading) setIsLoading(true);
    if (timeout) setTimeout(false);
    if (networkError) setNetworkError(false);

    API.getCarsForUser(user.id, { signal })
      .then((carsData) => {
        if (!mountedRef.current) return null;
        setCars(carsData);
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
          // setError(err.message);
          setNetworkError(true);
        } else {
          setError(err.message);
        }
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, timeout, networkError, isLoading]);

  const deleteAdvert = useCallback((carId) => {
    if (!mountedRef.current) return null;
    if(!isLoading) setIsLoading(true);
    API.deleteCarAdvert(carId, { signal })
      .then((status) => {
        if (!mountedRef.current) return null;
        if (status && cars.length > 0) {
          const dup = cars.filter((car) => car._id !== carId);
          setCars(dup);
        }
      })
      .catch((err) => {
        if (!mountedRef.current) return null;
        setIsLoading(false);
        if (err.message.includes("timeout")) {
          toast.error("Request timed out");
          setError(err.message);
        } else if (err.message.includes("Authentication error")) {
          // redirect to login
          saveUser({});
          navigate(
            `${Settings.getBaseURL()}/login?redirect=${window.location.href}`,
            { replace: true }
          );
        } else if (err.message === "Network Error") {
          toast.error(err.message);
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars, isLoading]);

  useEffect(() => {
    loadUserCars();
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" mx-8  ">
      <div className=" py-8 flex gap-12 items-center ">
        <h3 className=" text-4xl font-medium md:mx-8 lg:mx-12  text-center w-full text-navy-blue ">
          Your Adverts
        </h3>

        <Link
          to="create"
          className={` flex gap-2 text-sm w-fit min-w-[8rem]  bg-navy-blue hover:bg-navy-blue-90 py-3 h-fit rounded-md text-light-sky-blue justify-center items-center tracking-wider px-2 `}
        >
          <i className=" fa fas fa-plus " />
          <span className="w-fit">New &nbsp;Advert</span>
        </Link>
      </div>

      {
        <div
          className={` text-red-400 flex justify-center text-[14px] text-center w-full h-8 ${
            error ? "visible" : "invisible"
          }`}
        >
          {error}
        </div>
      }

      {!error && isLoading && <Loading />}

      {!error && !isLoading && timeout && !networkError && (
        <RequestTimeout retry={loadUserCars} />
      )}

      {!error && !isLoading && !timeout && networkError && (
        <NetworkError retry={loadUserCars} />
      )}

      {!error &&
        !timeout &&
        !networkError &&
        !isLoading &&
        (cars.length > 0 ? (
          <div className=" grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mx-8 gap-8 place-items-center my-8 ">
            {cars.map((car) => (
              <div
                className="w-full max-w-[22rem] flex flex-col gap-4 "
                key={car._id}
              >
                <div className="pointer-events-none w-full ">
                  <Card
                    car={{
                      id: car._id,
                      model: car.model,
                      year: car.year,
                      manufacturer: car.manufacturer,
                      price: car.price,
                      image: car.image,
                    }}
                  />
                </div>
                <div className="  ">
                  <button
                    className=" px-4 py-2 text-lg flex justify-center items-center bg-navy-blue rounded-md tracking-widest text-white hover:bg-navy-blue-90 "
                    onClick={() => deleteAdvert(car._id)}
                  >
                    Delete Advert
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" absolute text-2xl text-[#827C90] p-4 top-[50%] translate-y-[-50%] text-center left-[50%] translate-x-[-50%] rounded-md  max-w-md ">
            You have not created any adverts
          </div>
        ))}
    </div>
  );
};

export default UserAdverts;
