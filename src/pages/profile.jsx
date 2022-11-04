import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useUser } from "../contexts/user.context";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import Settings from "../utils/settings";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPwLoading, setIsPwLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;

  // password hidden states
  const [pwHidden, setPwHidden] = useState(true);
  const [confirmPwHidden, setConfirmPwHidden] = useState(true);
  const [newPwHidden, setNewPwHidden] = useState(true);

  const { user, saveUser } = useUser();

  const mountedRef = useRef(true);

  const updateUserDetails = useCallback(
    (e) => {
      e.preventDefault();
      if (!mountedRef.current) return null;
      if (!isLoading) setIsLoading(true);
      if (fullName === user.fullName || !fullName) {
        setIsLoading(false);
        toast.warn("no changes have been made");
        return;
      }
      let body = { fullName };

      API.updateUser(user.id, body, { signal })
        .then((userData) => {
          if (!mountedRef.current) return null;
          saveUser({
            id: user.id,
            email: userData.email,
            fullName: userData.fullName,
            token: user.token,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          if (!mountedRef.current) return null;
          if (err.message.includes("Authentication error")) {
            // redirect to login
            saveUser({});
            navigate(
              `${Settings.getBaseURL()}/login?redirect=${window.location.href}`,
              { replace: true }
            );
          }
          // TODO: check timeout and network errors
          toast.error(err.message);
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, fullName, isLoading]
  );

  const updatePassword = useCallback(
    (e) => {
      e.preventDefault();
      if (!mountedRef.current) return null;
      if (message) setMessage("");
      if (!isPwLoading) setIsPwLoading(true);
      if (!currentPassword || !newPassword || !confirmPassword) {
        setMessage("fill in all password fields");
        toast.warn("fill in all password fields");
        setIsPwLoading(false);
        return;
      }
      if (currentPassword === newPassword) {
        setMessage("current and new passwords must not be equal");
        toast.warn("current and new passwords must not be equal");
        setIsPwLoading(false);
        return;
      }
      if (confirmPassword !== newPassword) {
        setMessage("new passwords must be equal");
        toast.warn("new passwords must be equal");
        setIsPwLoading(false);
        return;
      }
      let body = { currentPassword, newPassword, confirmPassword };

      API.updateUser(user.id, body, { signal })
        .then((userData) => {
          if (!mountedRef.current) return null;
          saveUser({
            id: user.id,
            email: userData.email,
            fullName: userData.fullName,
            token: user.token,
          });
          setIsPwLoading(false);
        })
        .catch((err) => {
          if (!mountedRef.current) return null;
          if (err.message.includes("Authentication error")) {
            // redirect to login
            saveUser({});
            navigate(
              `${Settings.getBaseURL()}/login?redirect=${window.location.href}`,
              { replace: true }
            );
          }
          // TODO: check timeout and network errors
          toast.error(err.message);
          setIsPwLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, currentPassword, newPassword, confirmPassword, isPwLoading]
  );

  const setUserProfile = useCallback(() => {
    if (!mountedRef.current) return null;
    if (!isLoading) setIsLoading(true);
    if (Object.keys(user).length > 0) {
      user.fullName && setFullName(user.fullName);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  useEffect(() => {
    if (Object.keys(user).length) {
      setUserProfile();
    }
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="  min-h-[100vh] sm:min-h-[100vh] relative ">
      <div className=" py-8 relative max-w-lg mx-auto md:mx-8 lg:mx-12 lg:max-w-none flex gap-12 items-center  ">
        <h3 className=" text-4xl font-medium md:mx-8 lg:mx-12 text-center w-full text-navy-blue ">
          Profile
        </h3>
      </div>

      <div className=" mb-12 max-w-lg md:max-w-2xl flex flex-col mx-auto px-8 ">
        <div className=" text-navy-blue text-3xl font-medium mb-8 ">
          <h2 className=" font-mono ">
            Hello {user && user.fullName && user.fullName.split(" ")[0]}
          </h2>
          <p className=" text-lg font-normal text-navy-blue/50 italic ">
            {user && user.email && user.email}
          </p>
        </div>

        <form
          onSubmit={(e) => updateUserDetails(e)}
          className=" w-full max-w-lg md:max-w-2xl text-navy-blue mx-auto mb-8 transition ease-in-out duration-200 "
        >
          <h4 className=" text-lg font-semibold mb-4 border-b-2 border-b-highlight-green ">
            Update Details
          </h4>

          <div className=" grid gap-x-8 md:grid-cols-2 ">
            <fieldset className=" w-full relative mb-8 flex items-start flex-col ">
              <label className=" w-full text-sm  ">Full name</label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="  w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
            </fieldset>
          </div>

          <button
            type="submit"
            // disabled={fullName === user.fullName}
            className=" disabled:bg-navy-blue/40 disabled:pointer-events-none w-full flex justify-center items-center mb-8 h-12 bg-navy-blue hover:bg-navy-blue-90 text-white rounded-lg text-[1rem] tracking-wider hover:tracking-widest "
          >
            {!isLoading ? (
              <span className="">Update</span>
            ) : (
              <i className=" fa fal fa-spinner-third fa-spin speed fa-1x fa-fw " />
            )}
          </button>
        </form>

        <form
          onSubmit={(e) => updatePassword(e)}
          className=" w-full max-w-lg md:max-w-2xl text-navy-blue mx-auto transition ease-in-out duration-200 "
        >
          <h4 className=" text-lg font-semibold mb-4 border-b-2 border-b-highlight-green ">
            Change Password
          </h4>

          <div
            className={` text-red-400 flex justify-center text-[14px] text-center w-full h-8 ${
              !message && "hidden"
            }`}
          >
            {message}
          </div>

          <div className=" grid gap-x-8 md:grid-cols-2 ">
            <fieldset className=" relative mb-8 flex items-start flex-col ">
              <label className=" w-full text-sm  ">Current Password</label>
              <input
                type={pwHidden ? "password" : "text"}
                name="current-password"
                id="current-password"
                value={currentPassword}
                required={true}
                minLength={6}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                className="  w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
              <i
                className={` fal ${
                  !pwHidden ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg right-4 top-[65%] translate-y-[-50%] cursor-pointer `}
                onClick={() => setPwHidden(!pwHidden)}
              />
            </fieldset>

            <fieldset className=" relative mb-8 flex items-start flex-col ">
              <label className=" w-full text-sm  ">New Password</label>
              <input
                type={newPwHidden ? "password" : "text"}
                name="new-password"
                id="new-password"
                value={newPassword}
                required={true}
                minLength={6}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="  w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
              <i
                className={` fal ${
                  !newPwHidden ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg right-4 top-[65%] translate-y-[-50%] cursor-pointer `}
                onClick={() => setNewPwHidden(!newPwHidden)}
              />
            </fieldset>
          </div>

          <div className=" grid gap-x-8 md:grid-cols-2 ">
            <fieldset className=" relative mb-8 flex items-start flex-col ">
              <label className=" w-full text-sm  ">Confirm Password</label>
              <input
                type={confirmPwHidden ? "password" : "text"}
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                required={true}
                minLength={6}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="  w-full p-2 outline-none h-12 overflow-hidden focus:border-2 bg-white/50 rounded-lg border border-navy-blue "
              />
              <i
                className={` fal ${
                  !confirmPwHidden ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg right-4 top-[65%] translate-y-[-50%] cursor-pointer `}
                onClick={() => setConfirmPwHidden(!confirmPwHidden)}
              />
            </fieldset>
          </div>

          <button
            type="submit"
            className=" disabled:bg-navy-blue/40 disabled:pointer-events-none w-full flex justify-center items-center mb-8 h-12 bg-navy-blue hover:bg-navy-blue-90 text-white rounded-lg text-[1rem] tracking-wider hover:tracking-widest "
          >
            {!isPwLoading ? (
              <span className="">Change Password</span>
            ) : (
              <i className=" fa fal fa-spinner-third fa-spin speed fa-1x fa-fw " />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
