import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import mycss from "./Item.module.css";
export const Historyitem = (props) => {
  const navigate = useNavigate();
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  return (
    <>
      <div className={`${mode} card mb-3`} style={{ maxwidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <a
              href={`https://ezsell-backend.vercel.app/${props.data.image}`}
              target="_mail"
            >
              <div className="col-12 centre  ">
                <div className={`${mycss.onhovtext} centre fs-3`}>
                  click to view
                </div>

                <img
                  src={`https://ezsell-backend.vercel.app/${props.data.image}`}
                  className={`img-fluid rounded-end ${mycss.hovimg}`}
                  alt="..."
                  style={{ maxwidth: "540px", maxHeight: "540px" }}
                />
              </div>
            </a>
          </div>

          <div className="col-md-8">
            <div
              className={` fs-5  card-header ${
                mode === "dark" ? "light" : "dark"
              } rounded-end-top  `}
            >
              {props.data.title}
            </div>
            <div className="card-body">
              <p className="card-text">
                Buyer name:{props.data.final_buyer[0].name}
              </p>
              <p className="card-text">
                Phone no.:{props.data.final_buyer[0].phone}
              </p>
              <p className="card-text">
                Email:{props.data.final_buyer[0].email}
              </p>
              <p className="card-text">
                <small
                  className={` ${
                    mode === "dark" ? "white" : "black"
                  }text-body-secondary`}
                >
                  Status:
                </small>
                <div
                  className={`${mode === "dark" ? "light" : "dark"} progress`}
                  role="progressbar"
                  aria-label="Animated striped example"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar  progress-bar-striped progress-bar-animated"
                    style={{ width: "100%" }}
                  >
                    THE DEAL IS COMPLETED
                  </div>
                </div>

                <figcaption className={`text-${mode} blockquote-footer mt-2`}>
                  click on image to get a better view
                </figcaption>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};