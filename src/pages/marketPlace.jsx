import { useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/card";
import RequestTimeout from "../components/requestTimeout";
import NetworkError from "../components/networkError";
import { useUser } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Settings from "../utils/settings";

const MarketPlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const { saveUser } = useUser();
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;

  // errors
  const [error, setError] = useState("");
  const [timeout, setTimeout] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const mountedRef = useRef(true);

  const loadCars = useCallback(() => {
    if (!mountedRef.current) return null;
    if (!isLoading) setIsLoading(true);
    if (timeout) setTimeout(false);
    if (networkError) setNetworkError(false);

    API.getAllCars({ signal })
      .then((carsData) => {
        if (!mountedRef.current) return null;
        setCars(carsData);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!mountedRef.current) return null;
        setIsLoading(false);
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, timeout, networkError]);

  useEffect(() => {
    loadCars();
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && error) {
    return (
      <div
        className={` text-red-400 flex justify-center text-[14px] text-center w-full h-8 ${
          error ? "visible" : "invisible"
        }`}
      >
        {error}
      </div>
    );
  }

  if (!isLoading && networkError) {
    return <NetworkError retry={loadCars} />;
  }

  if (!isLoading && timeout) {
    return <RequestTimeout retry={loadCars} />;
  }

  if (!isLoading && !error && !timeout && !networkError) {
    return cars.length > 0 ? (
      <div className=" grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mx-8 gap-8 place-items-center my-8 ">
        {cars.map((car) => (
          <Card
            car={{
              id: car._id,
              model: car.model,
              year: car.year,
              manufacturer: car.manufacturer,
              price: car.price,
              image: car.image,
            }}
            key={car._id}
          />
        ))}
      </div>
    ) : (
      <div className=" absolute text-2xl text-navy-blue border-solid border-navy-blue border p-4 top-[50%] translate-y-[-50%] text-center left-[50%] translate-x-[-50%] rounded-md  max-w-md ">
        No data to display
      </div>
    );
  }
};

export default MarketPlace;
