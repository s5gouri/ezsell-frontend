import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "../common.css";
import mycss14 from "./Setprofile.module.css";
export const Setprofile = () => {
  const navigate = useNavigate();
  const [USERPROF, setimg] = useState("");
  const [NEWPROFILEIMG, setimg1] = useState("nope");

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
      console.log("object", file);
      const base64 = await convertToBase64(file);
      setimg(base64);
      resolve(setimg1(e.target.files[0]));
    });
  };
  const send = async () => {
    if (USERPROF === "") {
      alert("Please select an image");
    } else {
      try {
        const responseForSignup = await axios.post(
          "https://ezsell-backend.vercel.app/user/updating",
          { NEWPROFILEIMG },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (responseForSignup.data === 1) {
          navigate("/user/dashboard");
        }
      } catch {
        alert("Please try again later");
        navigate("/user/dashboard");
      }
    }
  };
  const skip = () => {
    navigate("/user/dashboard");
  };
  return (
    <>
      <div className={mycss14.body}>
        <div className="container">
          <div className="row centre">
            <div className="col-md-5  ">
              <div className="row ">
                <div className="col centre">
                  <label htmlFor="selectimg">
                    <img
                      src={
                        USERPROF ||
                        "https://ezsell-backend.vercel.app/images/defaultprofile.png"
                      }
                      alt="..."
                      className="rounded-circle"
                      style={{ cursor: "pointer" }}
                      width="250px"
                      height="250px"
                    />
                  </label>
                </div>
                <div className="row centre mt-2 fs-3">
                  Set Your Profile Image
                </div>
                <div className="row mt-2 centre">
                  <div className="col-8 ">
                    <input
                      type="file"
                      id="selectimg"
                      accept=".jpeg, .png, .jpg"
                      className="form-control bg-info text-light"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </div>
                </div>
                <div className="row mt-2 centre">
                  <div className="col centre">
                    <button className="btn btn-info" onClick={() => send()}>
                      Submit
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => skip()}
                    >
                      Skip For Now
                    </button>
                  </div>
                </div>
                <div className="row mt-2 centre">
                  <div className="col-5 centre"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
