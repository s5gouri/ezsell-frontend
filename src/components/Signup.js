import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import mycss11 from "./Signup.module.css";
import { Navbar } from "./Navbar";
export const Signup = () => {
  const [PHONE, setphone] = useState("");
  const [FULLNAME, setname] = useState("");
  const [ADDRESS, setaddress] = useState("");
  const [EMAIL, setemail] = useState("");
  const [PASSWORD, setpass] = useState("");
  const [PROFILEIMG, setprofile] = useState(null);
  const [ROLE, setrole] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (event) => {
    event.preventDefault();

    const data = {
      FULLNAME,
      PHONE,
      EMAIL,
      PASSWORD,
      ADDRESS,
      ROLE,
      PROFILEIMG,
    };
    const formData = new FormData();
    formData.append("FULLNAME", FULLNAME);
    formData.append("PHONE", PHONE);
    formData.append("EMAIL", EMAIL);
    formData.append("PASSWORD", PASSWORD);
    formData.append("ADDRESS", ADDRESS);
    formData.append("ROLE", ROLE);
    formData.append("PROFILEIMG", PROFILEIMG);
    const mailSend = async () => {
      try {
        const responseForSignup = await axios.post(
          "https://ezsell-backend.vercel.app/log/sign-up",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("from mailsend func---", responseForSignup.data);
        if (responseForSignup.data === 1) {
          console.log("MAIL SEND successfully waiting for user");
          navigate("/mail-confirm", { state: { u_data: data } });
        } else if (responseForSignup.data === 2) {
          alert("User already exists");
          navigate("/signin");
        } else {
          alert("Something went wrong please try again");
          navigate("/signup");
        }
      } catch (error) {
        console.log("Signup error", error);
        navigate("/signup", { state: { err: "PLEASE TRY AGAIN" } });
      }
    };
    mailSend();
  };
  const loginwithgoogle = () => {
    window.open(
      "https://ezsell-backend.vercel.app/auth/google?signup=yess",
      "_self"
    );
  };
  useEffect(() => {
    const user_details = async () => {
      try {
        const response1 = await axios.post(
          "https://ezsell-backend.vercel.app/user",
          {},
          {
            withCredentials: true,
          }
        );
        if (response1.data !== 0) {
          window.location.href = "http://localhost:3000/user/dashboard";
        }
      } catch (error) {
        console.log("Signup error-->", error);
      }
    };

    user_details();
  }, [navigate]);
  useEffect(() => {
    document.title = "Sign-up";
  });
  return (
    <>
      <Navbar confirm={5} />
      <div className={`${mycss11.body1} `}>
        <div className={`container mt-4 ${mycss11.a1}`}>
          <div className={`row ${mycss11.centre1}`}>
            <div className={`col-md-5 fs-1 ${mycss11.centre1}  `}>
              <div
                className={`col-md-5 fs-1 ${mycss11.centre1} ${mycss11.heading} `}
              >
                Sign-up to ezSell
              </div>
            </div>
            <div className={`col-md-6 ${mycss11.aaa} `}>
              <form onSubmit={handlesubmit}>
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`form-label ${mycss11.txt}`}
                  >
                    Full name:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${mycss11.aaa} `}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={FULLNAME}
                    onChange={(e) => setname(e.target.value)}
                    name="NAME"
                    required
                  />
                </div>
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail2"
                    className={`form-label ${mycss11.txt}`}
                  >
                    Phone No:
                  </label>
                  <input
                    type="number"
                    className={`form-control  ${mycss11.aaa}`}
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                    value={PHONE}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                        setphone(value);
                      }
                    }}
                    name="NAME"
                    maxLength="10"
                    minLength="10"
                    title="Phone number must be 10 digits"
                    required
                  />
                </div>
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail3"
                    className={`form-label ${mycss11.txt}`}
                  >
                    Email address:
                  </label>
                  <input
                    type="email"
                    className={`form-control  ${mycss11.aaa}`}
                    id="exampleInputEmail3"
                    aria-describedby="emailHelp"
                    value={EMAIL}
                    onChange={(e) => setemail(e.target.value)}
                    name="EMAIL"
                    required
                  />
                  <div id="emailHelp" className={`form-text ${mycss11.txt}`}>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail4"
                    className={`form-label ${mycss11.txt}`}
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${mycss11.aaa}`}
                    id="exampleInputEmail4"
                    aria-describedby="emailHelp"
                    value={ADDRESS}
                    onChange={(e) => setaddress(e.target.value)}
                    name="ADDRESS"
                    required
                  />
                </div>
                <div className={`mb-1 d-flex`}>
                  <div className={`col me-2`}>
                    <label
                      htmlFor="exampleInputPassword6"
                      className={`form-label ${mycss11.txt}`}
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      className={`form-control  ${mycss11.aaa}`}
                      id="exampleInputPassword6"
                      name="PASSWORD"
                      value={PASSWORD}
                      onChange={(e) => setpass(e.target.value)}
                      required
                    />
                  </div>
                  <div className={`col`}>
                    <label
                      htmlFor="role-select"
                      className={`${mycss11.txt} form-label`}
                    >
                      Role:
                    </label>
                    <select
                      className={`form-control  ${mycss11.aaa}`}
                      id="role-select"
                      name="ROLE"
                      value={ROLE}
                      onChange={(e) => setrole(e.target.value)}
                      required
                    >
                      <option value="">Please select a role</option>
                      <option value="N_USER">Sell on ezSell</option>
                      <option value="BUYER">Buy on ezSell</option>
                    </select>
                  </div>
                </div>
                <div className={`mb-1 d-flex`}>
                  <div className={`col centre`}>
                    <button
                      type="submit"
                      className={`btn btn-outline-info text-dark fs-5 m1-3 mt-2 me-3`}
                    >
                      Submit
                    </button>
                    <div className="centre me-3 mt-2 fs-4">OR</div>
                    <div
                      className="login-with-google-btn mt-2"
                      onClick={loginwithgoogle}
                    >
                      Sign Up With Google
                    </div>
                  </div>
                </div>
              </form>

              <div className={`text-center`}>
                <hr className={`a3 mb-1 white ${mycss11.txt}`} />
                <h2 className={`text-center fs-5  text-dark`}>
                  Already have an account?
                </h2>
                <Link to="/signin">
                  <button
                    type="button"
                    className={`fs-4 btn btn-link link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ch`}
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
