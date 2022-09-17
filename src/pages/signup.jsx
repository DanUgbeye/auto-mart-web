import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import API from "../utils/api";
import Heading from "../components/heading";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwHidden, setPwHidden] = useState(true);
  const [confirmPwHidden, setConfirmPwHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, saveUser } = useContext(UserContext);

  function handleSignUp(e) {
    e.preventDefault();
    setIsLoading(true);
    API
      .signup({ email, fullName, password })
      .then(({ _id, email, fullName, token }) => {
        const data = {
          id: _id,
          email,
          fullName,
          token
        }
        saveUser(data);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setIsLoading(false);
      navigate("/marketplace", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className=" relative w-full bg-primary-red-90 min-h-[100vh] flex lg:grid p-8 ">
      <section className=" z-[1000] w-full h-fit self-center ">
        <Heading
          heading={"Sign Up"}
          supportText={"create an account with Auto Mart"}
          extraStyle={" text-primary-light-60 mb-8"}
          headingStyle={" text-7xl font-light text-center"}
          supportTextStyle={"text-center"}
        />

        <form className=" w-full max-w-md text-primary-red-30 mx-auto ">
          {error && (
            <div className=" text-red-600 border-solid border p-2 text-lg bg-white/50 border-red-600 w-full text-center my-4 ">
              {error}
            </div>
          )}

          <fieldset className=" relative mb-8 flex items-center ">
            <input
              type="text"
              name="full-name"
              id="full-name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              className=" w-full p-2 pl-12 outline-none h-[48px] overflow-hidden "
              placeholder="full name"
            />
            <i className="fa-user fas absolute text-lg left-4 top-[50%] translate-y-[-50%] pointer-events-none " />
          </fieldset>

          <fieldset className=" relative mb-8 flex items-center ">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" w-full p-2 pl-12 outline-none h-[48px] overflow-hidden "
              placeholder="email"
            />
            <i className="fa-user fas absolute text-lg left-4 top-[50%] translate-y-[-50%] pointer-events-none " />
          </fieldset>

          <fieldset className=" relative mb-8 ">
            <input
              type={pwHidden ? "password" : "text"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className=" w-full  p-2 pl-12 outline-none h-[48px] overflow-hidden border-b "
              placeholder="password"
            />
            {password && (
              <i
                className={` fal ${
                  !pwHidden ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg right-4 top-[50%] translate-y-[-50%] cursor-pointer `}
                onClick={() => setPwHidden(!pwHidden)}
              />
            )}
            <i className="fa-lock fas absolute text-lg left-4 top-[50%] translate-y-[-50%] pointer-events-none " />
          </fieldset>

          <fieldset className=" relative mb-8 ">
            <input
              type={confirmPwHidden ? "password" : "text"}
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className=" w-full  p-2 pl-12 outline-none h-[48px] overflow-hidden border-b "
              placeholder="confirm password"
            />
            {confirmPassword && (
              <i
                className={` fal ${
                  !confirmPwHidden ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg right-4 top-[50%] translate-y-[-50%] cursor-pointer `}
                onClick={() => setConfirmPwHidden(!confirmPwHidden)}
              />
            )}
            <i className="fa-lock fas absolute text-lg left-4 top-[50%] translate-y-[-50%] pointer-events-none " />
          </fieldset>

          <button
            className=" w-full h-[48px] bg-primary-red-60 hover:bg-primary-red-60/60 text-white rounded-md text-base-blue text-lg tracking-wider hover:tracking-widest "
            onClick={(e) => handleSignUp(e)}
            disabled={isLoading}
          >
            {!isLoading ? (
              "sign up"
            ) : (
              <i className=" fa fal fa-spinner-third fa-spin speed fa-1x fa-fw " />
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
