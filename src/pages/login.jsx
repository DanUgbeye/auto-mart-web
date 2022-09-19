import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "../components/heading";
import { UserContext } from "../contexts/user.context";
import API from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwHidden, setPwHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, saveUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const controller = new AbortController();
  const signal = controller.signal;

  const mountedRef = useRef(true);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (!mountedRef.current) return null;
      if(!isLoading) setIsLoading(true);
      API.login({ email, password }, { signal })
        .then(({ _id, email, fullName, token }) => {
          if (!mountedRef.current) return null;
          const data = {
            id: _id,
            email,
            fullName,
            token,
          };
          saveUser(data);
        })
        .catch((err) => {
          if (!mountedRef.current) return null;
          toast.error(err.message);
          setError(err.message);
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email, password, isLoading]
  );

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setIsLoading(false);
      const redirectUrl = searchParams.get("redirect");
      toast.success("login successful");
      if (redirectUrl) navigate(redirectUrl, { replace: true });
      navigate("/marketplace", { replace: true });
    }
    return () => {
      controller.abort();
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className=" relative w-full bg-light-sky-blue min-h-[100vh] flex lg:grid p-8 ">
      <section className=" z-[1000] w-full h-fit self-center ">
        <Heading
          heading={"Login"}
          supportText={"sign in to access your Auto Mart account"}
          extraStyle={" text-navy-blue mb-6 "}
          headingStyle={"text-8xl font-light text-center"}
          supportTextStyle={"text-center"}
        />

        <form
          onSubmit={(e) => handleLogin(e)}
          className=" w-full max-w-md text-navy-blue mx-auto text-lg "
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

          <fieldset className=" relative mb-8 flex items-center ">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" w-full p-2 pl-12 outline-none h-[48px] overflow-hidden rounded-lg border border-navy-blue focus:border-2 bg-transparent "
              placeholder="email"
              required={true}
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
              className=" w-full p-2 pl-12 outline-none h-[48px] overflow-hidden  rounded-lg border border-navy-blue focus:border-2 bg-transparent "
              placeholder="password"
              required={true}
              minLength={6}
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

          <button
            className={` w-full h-[48px] text-white rounded-md text-base-blue text-lg tracking-wider hover:tracking-widest mb-4 ${
              isLoading
                ? "bg-navy-blue/60"
                : "bg-navy-blue/90 hover:bg-navy-blue"
            } `}
            disabled={isLoading}
          >
            {!isLoading ? (
              "Login"
            ) : (
              <i className=" fa fal fa-spinner-third fa-spin speed fa-1x fa-fw " />
            )}
          </button>

          <div className=" text-navy-blue flex w-fit ml-auto text-lg ">
            <span className=" mr-2 pointer-events-none ">
              Don't have an account?
            </span>
            <Link
              to={"/signup"}
              className={` font-medium text-bright-blue hover:text-bright-blue-hover border-b-2 border-transparent hover:border-highlight-green `}
            >
              Signup
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
