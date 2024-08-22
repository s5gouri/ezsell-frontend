import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import "../common.css";
import code from "../images/qrcodes.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export const Payment = () => {
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  const navigate = useNavigate();
  const [tempimg, setimg] = useState(code);
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
            if (rep.data.qrcode !== "null") {
              setimg(rep.data.qrcode);
            }
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
    e.preventDefault();
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setimg(base64);
      resolve(setqr(e.target.files[0]));
      console.log("object", QRCODE);
    });
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
                  <div className="container-fluid ">
                    <div className="row centre">
                      <div className="col-md-7">
                        <label htmlFor="exampleInputEmail5">
                          <img
                            src={tempimg}
                            alt="Unable to load at the moment"
                            width="300"
                            height="300"
                          />
                        </label>
                      </div>

                      <div className="col-md-3">
                        <form
                          className="mt-3  mb-3"
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
                            accept=".jpeg, .png, .jpg"
                            className={`form-control text-success`}
                            id="exampleInputEmail5"
                            onChange={(e) => handleFileUpload(e)}
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
