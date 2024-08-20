import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import mycss10 from "./Signin.module.css";
import { Navbar } from "./Navbar";
import imag from "../images/signin.png";
export const Signin = () => {
  const [EMAIL, setemail] = useState();
  const [PASSWORD, setpass] = useState();

  const navigate = useNavigate();
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.post(
        "https://ezsell-backend.vercel.app/log/sign-in",
        {
          EMAIL,
          PASSWORD,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response1.data);
      if (response1.data === 1) {
        navigate("/user/dashboard");
      } else if (response1.data === 10) {
        alert("Please enter correct email and password");
        navigate("/signin");
      } else {
        alert("Please enter correct email and password");
        window.location.reload(false);
      }
    } catch (error) {
      console.log("Signup error", error);
      navigate("/signin");
    }
  };
  const loginwithgoogle = () => {
    // window.open("http://localhost:8000/auth/google/callback", "_self");
    console.log("hii");
  };
  useEffect(() => {
    document.title = "Sign-in";
  });
  return (
    <>
      <Navbar confirm={4} />
      <div className={`${mycss10.body1}`}>
        <div className="container">
          <div className={`row ${mycss10.centre1}`}>
            <div className={`col-md-2 ${mycss10.centre1}`}>
              <div className={`fs-1 mb-3 ${mycss10.txt}`}>
                Sign-in to ezSell
              </div>
            </div>
            <div className={` col-md-9 `}>
              <div className={`row  bg-primar `}>
                <div className={`col-md-5 ${mycss10.hideimg} `}>
                  <Link to="https://ezsell-sg.vercel.app">
                    <img src={imag} alt="gg" height="500px" />
                  </Link>
                </div>
                <div
                  className={`col-md-5 bg-primar ${mycss10.brdr} ${mycss10.b} centre ${mycss10.centre1} ms-1 `}
                >
                  <div className={`col-md-10  mt-2 mb-2 `}>
                    <form onSubmit={handlesubmit}>
                      <div className={`mb-3`}>
                        <label
                          for="exampleInputEmail3"
                          className={`form-label `}
                        >
                          Email address:
                        </label>
                        <input
                          type="email"
                          className={`form-control  `}
                          id="exampleInputEmail3"
                          aria-describedby="emailHelp"
                          value={EMAIL}
                          onChange={(e) => setemail(e.target.value)}
                          name="EMAIL"
                          required
                        />
                        <div id="emailHelp" className={`form-text `}>
                          We'll never share your email with anyone else.
                        </div>
                      </div>

                      <div className={`mb-3`}>
                        <label
                          for="exampleInputPassword6"
                          className={`form-label `}
                        >
                          Password:
                        </label>
                        <input
                          type="password"
                          className={`form-control  `}
                          id="exampleInputPassword6"
                          name="PASSWORD"
                          value={PASSWORD}
                          onChange={(e) => setpass(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col centre  mb-3">
                        <button
                          type="submit"
                          className={`btn btn-outline-primary  me-2 fs-5  hov `}
                        >
                          Submit
                        </button>
                        <div className="centre me-2 fs-4">OR</div>
                        <div
                          className="login-with-google-btn2"
                          onClick={loginwithgoogle}
                        >
                          Continue With
                          <svg
                            viewBox="0 0 256 262"
                            preserveAspectRatio="xMidYMid"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                              fill="#4285F4"
                            ></path>
                            <path
                              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                              fill="#34A853"
                            ></path>
                            <path
                              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                              fill="#FBBC05"
                            ></path>
                            <path
                              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                              fill="#EB4335"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <p>
                        <Link
                          to="/change/password"
                          class="link-underline-success "
                        >
                          Forgot password?
                        </Link>
                      </p>
                    </form>
                    <div className={`text-center `}>
                      <hr className={`a3 mb-3  `} />
                      <h2 className={`text-center fs-5  `}>
                        Don't have an account ?
                      </h2>
                      <Link to="/signup">
                        <button
                          type="button"
                          className={`fs-4 btn btn-link link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover `}
                        >
                          sign-up
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
