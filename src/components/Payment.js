import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import "../common.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export const Payment = () => {
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  const navigate = useNavigate();
  const [user, setuser] = useState(0);
  const [confirmation, setconfirmation] = useState(1);
  const [QRCODE, setqr] = useState(null);
  useEffect(() => {
    const fetch_details = async () => {
      try {
        const rep = await axios.post(
          "https://ezsell-backend.vercel.app/user",
          {},
          { withCredentials: true }
        );
        if (rep.data !== 0) {
          if (rep.data.role === "BUYER") {
            setuser(rep.data);
            setconfirmation(1);
            console.log("=====", rep.data);
          } else if (rep.data.role === "N_USER") {
            alert("YOU ARE UN AUTHORISED");
            navigate("/user/dashboard");
          }
        } else {
          alert("YOU ARE UN AUTHORISED");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetch_details();

    console.log("=====44", user);
  }, []);

  const send_qrcode = async (e) => {
    console.log("hello");
    const formData = new FormData();
    formData.append("QRCODE", QRCODE);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/user/qrcode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      window.location.reload(false);
      if (response.data === 1) {
        console.log(response.data);
        alert("QR-CODE ADDED SUCCESSFULLY");
        navigate("/dashboard");
      } else {
        alert("ERROR ADDING QR-CODE PLEASE TRY LATER");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Navbar confirm={confirmation} />
      <div className={`${bg} ${mode}`}>
        <div className="cont">
          <div className="container ptop">
            <div className="row pt-4 mb-4">
              <div
                className={`col-12 ${aaa} fill centre `}
                style={{ height: "600px" }}
              >
                <div className="col-12 centre">
                  {user.qrcode === "null" && (
                    <>
                      <form
                        className="mt-3 mb-3"
                        encType="multipart/form-data"
                        onSubmit={(e) => send_qrcode(e)}
                      >
                        <label
                          htmlFor="exampleInputEmail5"
                          className={`form-label `}
                        >
                          Add your QR code:
                        </label>
                        <input
                          type="file"
                          className={`form-control text-success`}
                          id="exampleInputEmail5"
                          onChange={(e) => setqr(e.target.files[0])}
                          require
                        />
                        <button
                          type="submit"
                          className="btn mt-2 mb-2 btn-success"
                        >
                          Add QRcode
                        </button>
                      </form>
                    </>
                  )}
                  {user.qrcode !== "null" && (
                    <>
                      <div className="container-fluid ">
                        <div className="row centre">
                          <div className="col-md-7">
                            <img
                              src={`https://ezsell-backend.vercel.app${user.qrcode}`}
                              alt="Unable to load at the moment"
                              width="300"
                              height="300"
                            />
                          </div>

                          <div className="col-md-3">
                            <form
                              className="mt-3 ms-3 mb-3"
                              encType="multipart/form-data"
                              onSubmit={(e) => send_qrcode(e)}
                            >
                              <label
                                htmlFor="exampleInputEmail5"
                                className={`form-label `}
                              >
                                Update your QR code:
                              </label>
                              <input
                                type="file"
                                className={`form-control text-success`}
                                id="exampleInputEmail5"
                                onChange={(e) => setqr(e.target.files[0])}
                                require
                              />
                              <button
                                type="submit"
                                className="btn mt-2 mb-2 btn-success"
                              >
                                Add QRcode
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid ">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
