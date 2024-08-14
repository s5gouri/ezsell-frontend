import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import mycss2 from "./Footer.module.css";
import { useTheme } from "../ThemeContext";
export const Footer = () => {
  const { mode, toggleMode } = useTheme();
  const [EMAIL, setemail] = useState("");
  const [MESSAGE, setmessage] = useState("");
  const send_msg = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8000/user/message",
      { msg: MESSAGE, email: EMAIL },
      {
        withCredentials: true,
      }
    );
    window.location.reload(false);
  };
  return (
    <>
      <div className={`row ${mycss2.footer} ${mode} pt-4 pb-3`}>
        <div className="col-6 centre zero">
          <div className="row">
            <div className="col-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-c-circle"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
              </svg>
              2024 ezSell. All rights reserved.
            </div>
            <div className="col-12">
              <figcaption class="blockquote-footer mt-2">
                Made By <cite title="Source Title">Sahil Gouri</cite>
              </figcaption>
            </div>
          </div>
        </div>
        <div className="col-2  zero">
          <div className="row">
            <a href="/">about</a>
          </div>
          <div className="row">
            <a href="/">about owner</a>
          </div>
          <div className="row">
            <a href="https://message-sahil.vercel.app" target="_main">
              contact us
            </a>
          </div>
        </div>
        <div className="col-2  zero">
          <div className="row">
            <Link to="/user/dashboard">dashboard</Link>
          </div>
          <div className="row">
            <Link to="/user/profile">profile</Link>
          </div>
          <div className="row">
            <Link to="/user/profile#FEEDBACK">feedback</Link>
          </div>
        </div>
      </div>
    </>
  );
};
