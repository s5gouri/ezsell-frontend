import React, { useEffect, useState } from "react";
import mycss9 from "./Sellpost.module.css";
import { Navbar } from "./Navbar";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import "../common.css";
import axios from "axios";
import { Footer } from "./Footer";
export const Sellpost = (props) => {
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  const navigate = useNavigate();
  const [TITLE, settitle] = useState("");
  const [DESCRIPTION, setdescription] = useState("");
  const [PRICE, setprice] = useState("under 100");
  const [KABAD, setimg] = useState("");
  const [Confirmation, setconfirmation] = useState(1);
  const [send, setsend] = useState(false);
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
          console.log("noooooooooooo", response1.data.phone);
          console.log("noooooooooooo", response1.data);
          if (response1.data.phone === "Add Phone Number") {
            alert("Please Add Address & Phone no. To Continue");
            navigate("/user/profile");
          } else {
            setconfirmation(1);
          }
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log("Signup error", error);
        navigate("/signup");
      }
    };

    user_details();
  }, [navigate, props.rout]);

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    setsend(true);
    try {
      const response1 = await axios.post(
        "https://ezsell-backend.vercel.app/user/sell-post",
        { KABAD, TITLE, DESCRIPTION, PRICE },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response1.data === 1) {
        navigate("/user/dashboard");
      } else {
        navigate("/signin");
      }
    } catch {
      console.log("error");
    }
    setsend(false);
  };
  return (
    <>
      <Navbar confirm={Confirmation} />
      <body className={`${bg} ${mode}`}>
        <div className="cont">
          <div className={`${mycss9.centre} container  pt-5`}>
            <div className="fs-1 ">Sell Something</div>
          </div>
          <div className="container">
            <div className={`${mycss9.centre} row`}>
              <div className={`col-md-6 ${aaa} mt-4 text-start`}>
                <form
                  onSubmit={(event) => handleSubmit1(event)}
                  encType="multipart/form-data"
                >
                  <div className="mb-3 mt-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={TITLE}
                      onChange={(e) => settitle(e.target.value)}
                      name="TITLE"
                      required
                    />
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Add Image:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="exampleFormControlInput1"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => setimg(e.target.files[0])}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Add Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={DESCRIPTION}
                      onChange={(e) => setdescription(e.target.value)}
                      name="BODY"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role-select2" className="txt form-label">
                      Price Range:
                    </label>
                    <select
                      className="form-control"
                      id="role-select2"
                      value={PRICE}
                      onChange={(e) => setprice(e.target.value)}
                      required
                    >
                      <option value="under 100 Rs">under 100 Rs</option>
                      <option value="under 200 Rs">under 200 Rs</option>
                      <option value="under 300 Rs">under 300 Rs</option>
                      <option value="under 400 Rs">under 400 Rs</option>
                      <option value="under 500 Rs">under 500 Rs</option>
                      <option value="under 600 Rs">under 600 Rs</option>
                      <option value="under 700 Rs">under 700 Rs</option>
                      <option value="under 800 Rs">under 800 Rs</option>
                      <option value="under 900 Rs">under 900 Rs</option>
                      <option value="under 1000 Rs">under 1000 Rs</option>
                      <option value="above 1000 Rs">above 1000 Rs</option>
                    </select>
                    <button
                      type="submit"
                      className="btn btn-outline-success mt-3"
                      disabled={send}
                    >
                      {send === true ? "Please wait..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  );
};
