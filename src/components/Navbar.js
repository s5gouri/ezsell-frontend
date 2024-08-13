import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import mycss from "./Navbar.module.css";
import "../common.css";
import { useTheme } from "../ThemeContext";
export const Navbar = (props) => {
  const { mode, toggleMode } = useTheme();
  const [FULLNAME, setname] = useState("");
  const [UPROFILE, setuserprofile] = useState("/");
  const [ROLE, setrole] = useState("N_USER");
  const [BG, setbg] = useState(`${mycss.navbar}`);
  const [confirm, setconfirm] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setconfirm(props.confirm);
    console.log(props.confirm);
    const user_details = async () => {
      try {
        const response1 = await axios.post(
          "http://localhost:8000/user",
          {},
          {
            withCredentials: true,
          }
        );
        if (response1.data !== 0) {
          console.log(response1.data);
          console.log(response1.data.profileimg);
          // setauth(1);
          setrole(response1.data.role);
          setuserprofile(`http://localhost:8000${response1.data.profileimg}`);
          setname(response1.data.name);
        } else {
          setbg(`${mycss.navbar1}`);
          if (props.confirm === 0) {
            navigate("/");
          } else if (props.confirm === 6) {
            navigate("/change/password");
          } else if (props.confirm === 4) {
            navigate("/signin");
          } else if (props.confirm === 5) {
            navigate("/signup");
          } else if (props.confirm === 3) {
            alert("YOU ARE NOT AUTHENTICATED");
            navigate("/signin");
          } else {
            alert("YOU ARE NOT AUTHENTICATED");
            navigate("/signin");
          }
        }
      } catch (error) {
        console.log("Signup error", error);
        navigate("/signup");
      }
    };

    user_details();
  }, [navigate, props.confirm]);

  console.log("---->", FULLNAME);

  const userlogout = async () => {
    try {
      const response2 = await axios.post(
        "http://localhost:8000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response2.data === 1) {
        navigate("/signin");
      }
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <>
      <div className="container-fluid zero">
        {(confirm === 1 || props.confirm === 1 || props.confirm === 2) && (
          <>
            <nav
              className={`${BG}  ${mode}  z-3  navbar  navbar-expand-lg navbar-${
                mode === "dark" ? "light" : "dark"
              } fixed-top`}
            >
              <Link className="navbar-brand ms-2" to="/">
                ezSell
              </Link>
              <button
                className="navbar-toggler me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active ms-2"
                      aria-current="page"
                      to="/user/dashboard"
                    >
                      Home
                    </Link>
                  </li>
                  {ROLE !== "BUYER" && (
                    <>
                      <li className="nav-item">
                        <Link
                          to="/user/sell-post"
                          className="nav-link active ms-2"
                          aria-current="page"
                        >
                          Sell Items
                        </Link>
                      </li>
                    </>
                  )}
                  {ROLE === "BUYER" && (
                    <>
                      <li className="nav-item">
                        <Link
                          to="/requested"
                          className="nav-link active ms-2"
                          aria-current="page"
                        >
                          Accepted requests
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/payment"
                          className="nav-link active ms-2"
                          aria-current="page"
                        >
                          Add payment method
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle ms-2"
                      href="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="true"
                    >
                      {FULLNAME}
                    </a>

                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item " to="/user/profile">
                          View profile
                        </Link>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={userlogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div class="form-check form-switch ms-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckReverse"
                    onChange={toggleMode}
                  />
                  <label class="form-check-label" for="flexSwitchCheckReverse">
                    Light mode
                  </label>
                </div>
                <div className="dropdown  ">
                  <Link
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle ms-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="true"
                  >
                    <img
                      src={UPROFILE}
                      alt="profile"
                      width="32px"
                      height="32px"
                      className="rounded-circle"
                    />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li>
                      <Link className="dropdown-item " to="/user/profile">
                        Settings
                      </Link>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={userlogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        )}
        {(confirm === 0 ||
          props.confirm === 0 ||
          props.confirm === 4 ||
          props.confirm === 5) && (
          <>
            <nav className={`${BG}   z-3  navbar  navbar-expand fixed-top`}>
              <Link className="navbar-brand text-light  fw-bold ms-2" to="/">
                ezSell
              </Link>

              <Link className=" navbar-brand text-light   ms-2" to="/signup">
                Sign-up
              </Link>

              <Link className=" navbar-brand text-light   ms-2" to="/signin">
                Sign-in
              </Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
};
