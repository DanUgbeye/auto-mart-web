import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";

const Buy = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [car, setCar] = useState([]);
  const { user } = useContext(UserContext);

  function loadCar() {
    setIsLoading(true);
    API.getCar(id)
      .then((carData) => {
        setCar(carData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className=" max-w-6xl m-8 lg:mx-auto flex flex-col  ">
      {error && (
        <div className=" absolute text-2xl text-primary-red-60 border-solid border-primary-red-60 border p-4 top-[50%] translate-y-[-50%] flex justify-center font-semibold left-[50%] translate-x-[-50%] rounded-md  max-w-xl min-w-[20rem] ">
          {error}
        </div>
      )}

      <div className=" relative mb-8">
        <Link
          to="/marketplace"
          className={` relative left-0 z-[900] flex gap-2 w-fit min-w-[6rem] text-xl hover:text-primary-red-90 py-2 h-12 rounded-md text-primary-red-60 justify-center items-center tracking-wider px-2 `}
        >
          <i className=" fa fas fa-angles-left group-focus-visible:mr-2 peer-focus-within:mr-2 " />
          <span className="w-fit">Back</span>
        </Link>
      </div>

      {!error &&
        (isLoading ? (
          <Loading />
        ) : (
          <div className=" mx-auto">
            <div className=" flex flex-col md:flex-row gap-8 ">
              {car.image ? (
                <img
                  src={car.image.path}
                  alt={`${car.manufacturer} ${car.model}`}
                  className=" w-full min-h-[15rem] h-fit max-w-md mx-auto md:mx-0 "
                />
              ) : (
                <div className=" bg-primary-red-60 w-full min-w-[20rem] min-h-[15rem] h-fit max-w-md"></div>
              )}

              <div
                id="car-desc"
                className=" tracking-wider text-lg text-primary-red-90 w-full font-semibold md:w-full "
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
                <button
                  className=" px-4 py-2 text-xl flex justify-center items-center bg-primary-red-60 rounded-md tracking-widest text-white hover:bg-primary-red-90 "
                >
                  Buy Car
                </button>
              ) : (
                <div className=" text-primary-red-90 text-center text-lg font-semibold tracking-wider ">
                  * You posted this advert
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Buy;
