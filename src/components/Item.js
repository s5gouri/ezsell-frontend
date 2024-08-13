import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import mycss from "./Item.module.css";
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
      state: { all_data: props.data, user: props.view },
    });
  };

  return (
    <>
      <div className={`${mode} card mb-3`} style={{ maxwidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <a
              href={`http://localhost:8000/${props.data.image}`}
              target="_mail"
            >
              <div className="col-12 centre">
                <div className={`${mycss.onhovtext} centre fs-3`}>
                  click to view
                </div>

                <img
                  src={`http://localhost:8000/${props.data.image}`}
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
              <p className="card-text cont" style={{ maxHeight: "150px" }}>
                {props.data.description}
              </p>
              <p className="card-text">
                {props.view.role === "N_USER" && (
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
                {props.view.role === "N_USER" &&
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
                {(props.view.role === "BUYER" ||
                  (props.view.role === "N_USER" &&
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
