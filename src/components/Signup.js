import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import mycss1 from "./Signup.module.css";
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
          "http://localhost:8000/log/sign-up",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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

  return (
    <>
      <Navbar confirm={5} />
      <div className={`${mycss1.body1} `}>
        <div className={`container mt-4 ${mycss1.a1}`}>
          <div className={`row ${mycss1.centre1}`}>
            <div className={`col-md-5 fs-1 ${mycss1.centre1}  `}>
              <div
                className={`col-md-5 fs-1 ${mycss1.centre1} ${mycss1.heading} `}
              >
                Sign-up to ezSell
              </div>
            </div>
            <div className={`col-md-6 ${mycss1.aaa} `}>
              <form onSubmit={handlesubmit} encType="multipart/form-data">
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`form-label ${mycss1.txt}`}
                  >
                    Full name:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${mycss1.aaa} `}
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
                    className={`form-label ${mycss1.txt}`}
                  >
                    Phone No:
                  </label>
                  <input
                    type="number"
                    className={`form-control  ${mycss1.aaa}`}
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
                    className={`form-label ${mycss1.txt}`}
                  >
                    Email address:
                  </label>
                  <input
                    type="email"
                    className={`form-control  ${mycss1.aaa}`}
                    id="exampleInputEmail3"
                    aria-describedby="emailHelp"
                    value={EMAIL}
                    onChange={(e) => setemail(e.target.value)}
                    name="EMAIL"
                    required
                  />
                  <div id="emailHelp" className={`form-text ${mycss1.txt}`}>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className={`mb-1`}>
                  <label
                    htmlFor="exampleInputEmail4"
                    className={`form-label ${mycss1.txt}`}
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${mycss1.aaa}`}
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
                      htmlFor="exampleInputEmail5"
                      className={`form-label ${mycss1.txt}`}
                    >
                      Profile:
                    </label>
                    <input
                      type="file"
                      className={`form-control  ${mycss1.aaa}`}
                      id="exampleFormControlInput5"
                      onChange={(e) => setprofile(e.target.files[0])}
                    />
                  </div>
                  <div className={`col`}>
                    <label
                      htmlFor="role-select"
                      className={`${mycss1.txt} form-label`}
                    >
                      Role:
                    </label>
                    <select
                      className={`form-control  ${mycss1.aaa}`}
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
                  <div className={`col`}>
                    <label
                      htmlFor="exampleInputPassword6"
                      className={`form-label ${mycss1.txt}`}
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      className={`form-control  ${mycss1.aaa}`}
                      id="exampleInputPassword6"
                      name="PASSWORD"
                      value={PASSWORD}
                      onChange={(e) => setpass(e.target.value)}
                      required
                    />
                  </div>
                  <div className={`col ${mycss1.gd}`}>
                    <button
                      type="submit"
                      className={`btn btn-outline-primary ms-3`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className={`text-center`}>
                <hr className={`a3 mb-1 white ${mycss1.txt}`} />
                <h2 className={`text-center fs-5 white ${mycss1.txt}`}>
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
