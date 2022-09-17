import { useEffect, useState } from "react";
import Card from "../components/card";
import Loading from "../layouts/loading";
import API from "../utils/api";

const MarketPlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cars, setCars] = useState([]);

  function loadCars() {
    setIsLoading(true);
    API.getAllCars()
      .then((carsData) => {
        setCars(carsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <>
      {error && (
        <div className=" absolute text-2xl text-primary-red-60 border-solid border-primary-red-60 border p-4 top-[50%] translate-y-[-50%] flex justify-center font-semibold left-[50%] translate-x-[-50%] rounded-md  max-w-xl min-w-[20rem] ">
          {error}
        </div>
      )}

      {!error &&
        (isLoading ? (
          <Loading />
        ) : cars.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 gap-8 place-items-center my-8 ">
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
          <div className=" absolute text-2xl text-primary-red-60 border-solid border-primary-red-60 border p-4 top-[50%] translate-y-[-50%] text-center left-[50%] translate-x-[-50%] rounded-md  max-w-md ">
            No data to display
          </div>
        ))}
    </>
  );
};

export default MarketPlace;
