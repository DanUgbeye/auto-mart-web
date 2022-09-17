import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";

const UserAdverts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cars, setCars] = useState([]);
  const { user } = useContext(UserContext);

  function loadUserCars() {
    setIsLoading(true);
    API.getCarsForUser(user.id)
      .then((carsData) => {
        setCars(carsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }

  const deleteAdvert = (carID) => {
    setIsLoading(true);
    API.deleteCarAdvert(carID)
      .then((status) => {
        status && loadUserCars();
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUserCars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" mt-8 mx-8  ">
      <div className=" flex gap-12 items-center mb-8 ">
        <h3 className=" text-3xl md:mx-8 lg:mx-12  text-center w-full text-primary-red-60 ">
          Your Adverts
        </h3>

        <Link
          to="create"
          className={` flex gap-2 text-sm w-fit min-w-[8rem]  bg-primary-red-60 hover:bg-primary-red-90 py-3 h-fit rounded-md text-primary-light-30 justify-center items-center tracking-wider px-2 `}
        >
          <i className=" fa fas fa-plus " />
          <span className="w-fit">New &nbsp;Advert</span>
        </Link>
      </div>

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
              <div
                className="w-full max-w-[25rem] flex flex-col gap-4 "
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
                    className=" px-4 py-2 text-lg flex justify-center items-center bg-primary-red-60 rounded-md tracking-widest text-white hover:bg-primary-red-90 "
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
