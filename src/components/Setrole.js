import React, { useState, useEffect } from "react";
import mycss15 from "./Setrole.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../common.css";
export const Setrole = () => {
  const navigate = useNavigate();
  const [ROLE, setrole] = useState("user");
  const [ADDRESS, setaddress] = useState("");
  const [PHONE, setphone] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/user/updating",
        { ROLE, ADDRESS, PHONE },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data === 1) {
        navigate("/user/dashboard");
      } else {
        alert("Please try again later");
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log("error", error);
      alert("Please try again later");
      console.log(ROLE, ADDRESS, PHONE);
    }
  };
  return (
    <>
      <div className={mycss15.mybody}>
        <div className="container">
          <div className="row centre">
            <div className="col-md-6">
              <div className="row centre ">
                <div className="fs-2  centre mb-4">Welcome To ezSell</div>
                <div className="fs-2 mt-2  centre">
                  Lets Complete Your Profile First!
                </div>
                <div className="col-md-10">
                  <form onSubmit={(e) => handlesubmit(e)}>
                    <div className={`mt-3 mb-2`}>
                      <label for="exampleInputEmail3" className={`form-label `}>
                        Address:
                      </label>
                      <input
                        type="text"
                        className={`form-control  `}
                        id="exampleInputEmail3"
                        aria-describedby="emailHelp"
                        value={ADDRESS}
                        onChange={(e) => setaddress(e.target.value)}
                        name="ADDRESS"
                        required
                      />
                    </div>
                    <div className={`mt-3 mb-2`}>
                      <label
                        for="exampleInputPassword6"
                        className={`form-label `}
                      >
                        Phone:
                      </label>
                      <input
                        type="number"
                        className={`form-control  `}
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
                    <div className="col-12 centre mb-2">
                      <div className={`col `}>
                        <label htmlFor="role-select" className={` form-label`}>
                          Role:
                        </label>
                        <select
                          className={`form-control  `}
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
                      <div className="col centre">
                        <button
                          type="submit"
                          className={`btn btn-outline-info text-dark fs-5 m1-3 mt-4 me-3`}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
