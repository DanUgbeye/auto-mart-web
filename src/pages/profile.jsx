import { useState, useEffect, useContext } from "react";
import Heading from "../components/heading";
import { UserContext } from "../contexts/user.context";
import Loading from "../layouts/loading";
import API from "../utils/api";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user, saveUser } = useContext(UserContext);

  function updateUserDetails(e) {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    const body = {
      fullName,
    };
    if (currentPassword || newPassword || confirmPassword) {
      if (currentPassword && newPassword && confirmPassword) {
        if (confirmPassword !== newPassword) {
          setMessage("passwords must be equal");
          setIsLoading(false);
          return;
        }
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
        body.confirmPassword = confirmPassword;
      }
      setMessage("fill in all password fields");
      setIsLoading(false);
      return;
    }
    API.updateUser(user.id, body)
      .then((userData) => {
        saveUser({
          id: user.id,
          email: userData.email,
          fullName: userData.fullName,
          token: user.token,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    setIsEditing(!isEditing);
  }

  function setUserProfile() {
    setIsLoading(true);
    if (Object.keys(user).length > 0) {
      setEmail(user.email);
      setFullName(user.fullName);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="  min-h-[calc(100vh-3rem)] sm:min-h-[100vh] relative ">
      <Heading
        heading={"Your Profile"}
        supportText={"your auto mart profile details"}
        extraStyle={
          " px-8 py-2 text-primary-red-60 sticky top-0 left-0 right-0 z-[1000] bg-primary-light-30 shadow-black/10 shadow-md relative "
        }
        headingStyle={" text-4xl mb-2  "}
        supportTextStyle={" text-lg "}
      />

      {error && (
        <div className=" absolute text-2xl text-primary-red-60 border-solid border-primary-red-60 border p-4 top-[50%] translate-y-[-50%] flex justify-center left-[50%] translate-x-[-50%] rounded-md  max-w-xl min-w-[20rem] ">
          {error}
        </div>
      )}

      {!error &&
        (isLoading ? (
          <Loading />
        ) : (
          <div className=" my-12 mx-4 ">
            <div className=" w-full max-w-lg mb-6 mx-auto ">
              <button
                className={` flex gap-2 bg-primary-red-60 hover:bg-primary-red-90 p-2 w-[5rem] rounded-md text-primary-light-30 justify-center items-center ml-auto text-lg tracking-wider hover:tracking-widest ${
                  !isEditing ? "visible" : "invisible"
                } `}
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className=" fa fad fa-pencil " />
                <span>Edit</span>
              </button>
            </div>

            {message && (
              <div className=" text-primary-red-60 border-solid border-primary-red-60 border p-2 flex flex-col text-lg font-semibold  max-w-xl min-w-[20rem] mb-8 ">
                {message}
              </div>
            )}
            <form className=" w-full max-w-lg text-primary-red-30 mx-auto ">
              <fieldset className=" relative mb-8 flex items-center ">
                <label className=" w-[8rem] text-lg  ">Full name</label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  className=" w-full p-2 outline-none h-12 overflow-hidden "
                  readOnly={!isEditing ? true : false}
                />
              </fieldset>

              <fieldset className=" relative mb-8 flex items-center ">
                <label className=" w-[8rem] text-lg  ">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className=" w-full p-2 outline-none h-12 overflow-hidden "
                  readOnly={true}
                />
              </fieldset>

              {isEditing && (
                <>
                  <fieldset className=" relative mb-8 flex items-center ">
                    <label className=" w-[8rem] text-lg  ">
                      Current Password
                    </label>
                    <input
                      type={"text"}
                      name="current-password"
                      id="current-password"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                      }}
                      className=" w-full  p-2 outline-none h-12 overflow-hidden border-b "
                      readOnly={!isEditing ? true : false}
                    />
                  </fieldset>

                  <fieldset className=" relative mb-8 flex items-center ">
                    <label className=" w-[8rem] text-lg  ">New Password</label>
                    <input
                      type={"text"}
                      name="new-password"
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      className=" w-full  p-2 outline-none h-12 overflow-hidden border-b "
                      readOnly={!isEditing ? true : false}
                    />
                  </fieldset>

                  <fieldset className=" relative mb-8 flex items-center ">
                    <label className=" w-[8rem] text-lg  ">
                      Confirm Password
                    </label>
                    <input
                      type={"text"}
                      name="confirm-password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className=" w-full  p-2 outline-none h-12 overflow-hidden border-b "
                      readOnly={!isEditing ? true : false}
                    />
                  </fieldset>
                </>
              )}
              {isEditing && (
                <button
                  className=" w-[7rem] mx-auto flex justify-center items-center gap-2 py-2 h-12 bg-primary-red-60 hover:bg-primary-red-90 text-white rounded-md text-base-blue text-lg tracking-wider hover:tracking-widest "
                  onClick={(e) => updateUserDetails(e)}
                >
                  <i className=" fa far fa-save text-xl " />
                  Save
                </button>
              )}
            </form>
          </div>
        ))}
    </section>
  );
};

export default Profile;
