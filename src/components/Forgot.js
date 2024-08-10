import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../common.css";
export const Forgot = () => {
  const [EMAIL, setemail] = useState("");
  const [PASSWORD, setpass] = useState("");
  const navigate = useNavigate();
  const handle_submit = async (e) => {
    e.preventDefault();
    const response1 = await axios.post(
      "https://ezsell-backend.vercel.app/user/forgot",
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
      alert("check your email for password reset link");
      navigate("/signin");
    } else {
      alert("Please enter correct email and password");
    }
    window.location.reload(false);
  };
  return (
    <>
      <div className="full centre">
        <div className="container-fluid ">
          <div className="row  centre">
            <div className="col-md-4">
              <div className="fs-1 text-info">Forgot Password</div>
              <form onSubmit={(e) => handle_submit(e)}>
                <div className={`mb-3`}>
                  <label for="exampleInputEmail3" className={`form-label `}>
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
                  <div id="emailHelp" className={`form-text text-info `}>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className={`mb-3`}>
                  <label for="exampleInputPassword6" className={`form-label `}>
                    New Password:
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
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
