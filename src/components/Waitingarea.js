import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import mycss3 from "./Waitingarea.module.css";

export const Waitingarea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [EMAIL, setEmail] = useState();
  const [PASSWORD, setPassword] = useState();

  useEffect(() => {
    if (!location.state) {
      navigate("/signup");
      return;
    }
    const { u_data } = location.state;
    setData(u_data);
    setEmail(u_data.EMAIL);
    setPassword(u_data.PASSWORD);
  }, [location, navigate]);
  const mailSend = async (alldata) => {
    try {
      const responseForSignup = await axios.post(
        "https://ezsell-backend.vercel.app/log/sign-up",
        alldata,
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
      } else if (responseForSignup.data === 2) {
        navigate("/signin", { state: { err: "USER ALREADY EXISTS" } });
      } else {
        navigate("/signup", { state: { err: "USER ALREADY EXISTS" } });
      }
    } catch (error) {
      console.log("Signup error", error);
      navigate("/signup", { state: { err: "USER ALREADY EXISTS" } });
    }
  };

  useEffect(() => {
    if (!EMAIL || !PASSWORD) return;

    const check = async () => {
      try {
        const responseForSignin = await axios.post(
          "https://ezsell-backend.vercel.app/log/sign-in",
          {
            EMAIL,
            PASSWORD,
          },
          {
            withCredentials: true,
          }
        );
        console.log("from check function--", responseForSignin.data);
        if (responseForSignin.data === 1) {
          console.log("USER FOUND SUCCESFULLY");
          navigate("/user/dashboard");
        } else {
          setTimeout(() => {
            console.log("USER STILL NOT FOUND TRYING AGAIN IN 5sec");
            check();
          }, 4000);
        }
      } catch (error) {
        console.log("Signup error", error);
        navigate("/signup", { state: { err: "USER ALREADY EXISTS" } });
      }
    };

    const timeoutId = setTimeout(() => {
      check();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [EMAIL, PASSWORD, navigate]);

  const back_to_signup = (u_data) => {
    let newemail = prompt("Enter Correct Email");
    console.log("ccccccccccccccccc---", newemail);

    if (newemail !== "") {
      setEmail(newemail);
      const newformData = new FormData();
      newformData.append("FULLNAME", u_data.FULLNAME);
      newformData.append("PHONE", u_data.PHONE);
      newformData.append("EMAIL", newemail);
      newformData.append("PASSWORD", u_data.PASSWORD);
      newformData.append("ADDRESS", u_data.ADDRESS);
      newformData.append("ROLE", u_data.ROLE);
      newformData.append("PROFILEIMG", u_data.PROFILEIMG);
      console.log("hiihihihi");
      console.log("jnjnjnn---->", u_data);
      mailSend(newformData);
      console.log("=-------------======", newemail);
    }
  };

  return (
    <>
      <div className={`${mycss3.body2}`}>
        <div className={`container bg-primar `}>
          <div className={`row ${mycss3.centre} bg-warnig`}>
            <div className={`col-md-7 ${mycss3.aaa}`}>
              <div className={`row    `}>
                <div className={`col-md-12 bg-warnin mt-4  ${mycss3.centre} `}>
                  <div className={`col-md-4 ${mycss3.a} fs-4 bg-warnig  `}>
                    Email sent on :
                  </div>
                  <div className={`col-md-5 bg-primar  fs-5 `}>{EMAIL}</div>
                </div>

                <p className={`fs-5 ${mycss3.centre}`}>
                  Check your email for the verification link
                </p>

                <br />
                <div className={`row ${mycss3.centre}`}>
                  <div className={`col-4 mb-4 mb-4 mt-4 ${mycss3.centre} `}>
                    <div className={mycss3["banter-loader"]}>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                      <div className={mycss3["banter-loader__box"]}></div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className={`row ${mycss3.centre}`}>
                  <div className={`lead mb-2 ${mycss3.centre} col-sm-3 `}>
                    Not your Mail?
                  </div>
                </div>

                <div className={`row ${mycss3.centre} mb-2`}>
                  <div className={`d-grid gap-2 col-sm-4 mx-auto`}>
                    <button
                      className={`  mb-3 btn  ${mycss3["playstore-button"]}`}
                      onClick={() => back_to_signup(data)}
                    >
                      Click here to Change!!
                    </button>
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
