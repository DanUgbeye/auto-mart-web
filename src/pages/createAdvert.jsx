import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user.context";
import API from "../utils/api";

const CreateAdvert = () => {
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const controller = new AbortController();
  const signal = controller.signal;

  const mountedRef = useRef(true);

  const handleImageChange = useCallback((e) => {
    if (!mountedRef.current) return null;
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 1) {
        // throw error that files cannot be more than one
      }
      setImage(e.target.files[0]);
    }
  }, []);

  const resetValues = useCallback(() => {
    if (!mountedRef.current) return null;
    setModel("");
    setManufacturer("");
    setYear("");
    setPrice("");
    setImage();
  }, []);

  const createNewAdvert = useCallback(
    (e) => {
      e.preventDefault();
      if (!mountedRef.current) return null;
      const formData = new FormData();
      model && formData.append("model", model);
      user.id && formData.append("seller", user.id);
      manufacturer && formData.append("manufacturer", manufacturer);
      year && formData.append("year", year);
      price && formData.append("price", price);
      image && formData.append("image", image, image.name);

      //make api call
      if(!isLoading) setIsLoading(true);
      API.createCarAdvert(formData, { signal })
        .then((carData) => {
          if (!mountedRef.current) return null;
          setIsLoading(false);
          resetValues();
          navigate("/advert", { replace: true });
        })
        .catch((err) => {
          if (!mountedRef.current) return null;
          toast.error(err.message);
          setError(err.message);
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.id, model, manufacturer, year, price, image, isLoading]
  );

  useEffect(() => {
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" mx-4 text-navy-blue ">
      <div className=" py-8 relative max-w-lg mx-auto md:mx-8 lg:mx-12 lg:max-w-none flex gap-12 items-center ">
        <Link
          to="/advert"
          className={` absolute left-0 z-[900] flex gap-2 w-fit min-w-[6rem] text-xl hover:text-navy-blue-90 py-2 h-12 rounded-md text-navy-blue justify-center items-center tracking-wider px-2 `}
        >
          <i className=" fa fas fa-angles-left group-focus-visible:mr-2 peer-focus-within:mr-2 " />
          <span className="w-fit">Back</span>
        </Link>

        <h3 className=" text-4xl font-medium md:mx-8 lg:mx-12 text-center w-full text-navy-blue ">
          Create Advert
        </h3>
      </div>

      <form
        onSubmit={(e) => createNewAdvert(e)}
        className=" w-full max-w-lg mx-auto lg:max-w-none "
      >
        {
          <div
            className={` text-red-400 flex justify-center text-[14px] text-center w-full h-8 ${
              error ? "visible" : "invisible"
            }`}
          >
            {error}
          </div>
        }

        <div className=" flex flex-col lg:flex-row lg:gap-8 md:mx-8 lg:mx-auto justify-center max-w-4xl  ">
          <div className="w-full max-w-md mx-auto ">
            <fieldset className=" relative mb-8 flex justify-center flex-col ">
              <label className=" w-[11rem] text-lg  ">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => {
                  setManufacturer(e.target.value);
                }}
                placeholder="enter car manufacturer"
                required={true}
                className=" w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
            </fieldset>

            <fieldset className=" relative mb-8 flex justify-center flex-col ">
              <label className=" w-[11rem] text-lg  ">Model</label>
              <input
                type="text"
                name="model"
                id="model"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                placeholder="enter car model"
                required={true}
                className=" w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
            </fieldset>

            <fieldset className=" relative mb-8 flex justify-center flex-col ">
              <label className=" w-[11rem] text-lg  ">Year</label>
              <input
                type={"text"}
                name="year"
                id="year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                placeholder="enter year of manufacture"
                required={true}
                className=" w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
            </fieldset>

            <fieldset className=" relative mb-8 flex justify-center flex-col ">
              <label className=" w-[11rem] text-lg  ">Price</label>
              <input
                type={"text"}
                name="price"
                id="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="enter price of sale"
                required={true}
                className=" w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
            </fieldset>
          </div>

          <div className=" w-full ">
            <fieldset className=" relative mt-6 mb-8 flex items-center justify-center ">
              <label
                htmlFor="image"
                className=" text-navy-blue hover:text-navy-blue-90 text-lg cursor-pointer border-solid border-navy-blue border rounded-lg px-4 py-2 "
              >
                <span className=" flex gap-4 items-center ">
                  <i className="fa fa-2x fa-camera" />
                  {!image ? "select car image" : "choose another image"}
                </span>

                <input
                  type={"file"}
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  placeholder=""
                  className=" w-full hidden p-2 outline-none h-12 overflow-hidden "
                />
              </label>
            </fieldset>

            {image && (
              <div className=" grid place-items-center mb-12 ">
                <img
                  src={URL.createObjectURL(image)}
                  alt="car"
                  className=" max-w-sm w-full "
                />
              </div>
            )}
          </div>
        </div>

        <button className=" w-[7rem] mx-auto flex justify-center items-center gap-2 py-2 h-12 bg-navy-blue hover:bg-navy-blue-90 text-white rounded-md text-base-blue text-lg tracking-wider hover:tracking-widest ">
          {!isLoading ? (
            <>
              <i className=" fa far fa-save text-xl " />
              <span className="">create</span>
            </>
          ) : (
            <i className=" fa fal fa-spinner-third fa-spin speed fa-1x fa-fw " />
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAdvert;
