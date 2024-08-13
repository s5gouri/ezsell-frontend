import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import mycss2 from "./Signin.module.css";
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
        "http://localhost:8000/log/sign-in",
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
  return (
    <>
      <Navbar confirm={4} />
      <div className={`${mycss2.body1}`}>
        <div className="container">
          <div className={`row ${mycss2.centre1}`}>
            <div className={`col-md-2 ${mycss2.centre1}`}>
              <div className={`fs-1 mb-3 ${mycss2.txt}`}>Sign-in to ezSell</div>
            </div>
            <div className={` col-md-9 `}>
              <div className={`row  bg-primar `}>
                <div className={`col-md-5 ${mycss2.hideimg} `}>
                  <Link to="/">
                    <img src={imag} alt="gg" height="500px" />
                  </Link>
                </div>
                <div
                  className={`col-md-5 bg-primar ${mycss2.brdr} ${mycss2.b} centre ${mycss2.centre1} ms-1 `}
                >
                  <div className={`col-md-10  mt-2 mb-2 `}>
                    <form onSubmit={handlesubmit} enctype="multipart/form-data">
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

                      <button
                        type="submit"
                        className={`btn btn-outline-primary mb-3  hov`}
                      >
                        Submit
                      </button>
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
