import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import mycss5 from "./Item.module.css";
export const Item = (props) => {
  const navigate = useNavigate();
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  const [status, setstatus] = useState(33);
  const [tellstatus, settellstatus] = useState("UNDER PROCESS");
  useEffect(() => {
    if (props.data.status === "--buyer selected--") {
      setstatus(66);
      settellstatus("BUYER SELECTED WILL REACH SOON !!");
    } else if (props.data.status === "--deal done--") {
      setstatus(100);
      settellstatus("THE DEAL IS COMPLETED");
    }
  }, [props.data.status]);
  const full_post = () => {
    navigate("/post_view", {
      state: { all_data: props.data, user: props.view, role: props.userrole },
    });
  };

  const openImage = () => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${props.data.image}" alt="Image" />`);
  };
  return (
    <>
      <div className={`${mode} card mb-3`} style={{ maxwidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <div
              className="col-12 centre"
              style={{ cursor: "pointer" }}
              onClick={openImage}
            >
              {" "}
              <div className="col-12 centre">
                <div className={`${mycss5.onhovtext} centre fs-3`}>
                  click to view
                </div>

                <img
                  src={props.data.image}
                  className={`img-fluid rounded-end ${mycss5.hovimg}`}
                  alt="..."
                  style={{ maxwidth: "540px", maxHeight: "540px" }}
                />
              </div>
            </div>
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
              <p className="card-text cont" style={{ maxHeight: "150px" }}>
                {props.data.description}
              </p>
              <p className="card-text">
                {props.userrole === "N_USER" && (
                  <>
                    <small
                      className={` ${
                        mode === "dark" ? "white" : "black"
                      }text-body-secondary`}
                    >
                      Status:
                    </small>
                    <div
                      className={`${
                        mode === "dark" ? "light" : "dark"
                      } progress`}
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow={status}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-bar  progress-bar-striped progress-bar-animated"
                        style={{ width: `${status}%` }}
                      >
                        {tellstatus}
                      </div>
                    </div>
                  </>
                )}
                {props.userrole === "N_USER" &&
                  props.data.buyers.length !== 0 && (
                    <button
                      type="button"
                      onClick={full_post}
                      className={`  ${
                        mode === "dark"
                          ? "btn-outline-dark"
                          : "btn-outline-light"
                      } btn  position-relative mt-2`}
                    >
                      view
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {props.data.buyers.length}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  )}
                {(props.userrole === "BUYER" ||
                  (props.userrole === "N_USER" &&
                    props.data.buyers.length === 0)) && (
                  <button
                    onClick={full_post}
                    className={` ${
                      mode === "dark" ? "btn-outline-dark" : "btn-outline-light"
                    } mt-2 btn `}
                  >
                    view
                  </button>
                )}
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
