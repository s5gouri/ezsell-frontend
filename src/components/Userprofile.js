import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import { Historyitem } from "./Historyitem";
import mycss12 from "./Userprofile.module.css";
import "../common.css";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export const Userprofile = () => {
  const { mode, toggleMode, changebg, bg } = useTheme();
  const [FULLNAME, setname] = useState("");
  const [UPROFILE, setuserprofile] = useState("/");
  const [PHONE, setphone] = useState("");
  const [EMAIL, setemail] = useState("");
  const [ADDRESS, setaddress] = useState("");
  const [USERPROF, setimg] = useState("");
  const [NEWNAME, setnewname] = useState("");
  const [NEWUPROFILE, setnewuserprofile] = useState("nope");
  const [NEWADDRESS, setnewaddress] = useState("");
  const [NEWPHONE, setnewphone] = useState("");
  const [NEWEMAIL, setnewemail] = useState("");
  const [PASSWORD, setnewpass] = useState("");

  const [BLOGCOUNT, setcount] = useState(0);
  const [POSTLIST, setlist] = useState([]);
  const [ROLE, setrole] = useState("N_USER");
  const [Confirmation, setconfirmation] = useState(1);
  const [FEEDBACK_HERE, setfeedback] = useState("");
  const [list, setlist2] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const get_history = async () => {
      try {
        const response = await axios.post(
          "https://ezsell-backend.vercel.app/user/history",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data !== 0) {
          console.log(response.data);
          setlist2(response.data);
        }
      } catch {
        alert("Unable to fetch history");
      }
    };
    const user_details = async () => {
      try {
        const response1 = await axios.post(
          "https://ezsell-backend.vercel.app/user/profile",
          {},
          {
            withCredentials: true,
          }
        );

        if (response1.data !== 0) {
          console.log(response1.data.user);
          console.log(response1.data.allpost);
          changebg(response1.data.user.background);
          setconfirmation(1);
          setname(response1.data.user.name);
          setuserprofile(response1.data.user.profileimg);
          setphone(response1.data.user.phone);
          setemail(response1.data.user.email);
          console.log(response1.data.user.adderess);
          setaddress(response1.data.user.adderess);
          setcount(response1.data.allpost.length);
          setlist(response1.data.allpost);
          setrole(response1.data.user.role);
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log("Signup error", error);
        navigate("/signup");
      }
    };

    user_details();
    get_history();
  }, [navigate]);

  const handlenewsubmit = async (event) => {
    event.preventDefault();

    const data = {
      NEWNAME,
      NEWPHONE,
      EMAIL,
      PASSWORD,
      NEWADDRESS,
      NEWUPROFILE,
    };
    const formData1 = new FormData();
    formData1.append("FULLNAME", NEWNAME);
    formData1.append("PHONE", NEWPHONE);
    formData1.append("EMAIL", NEWEMAIL);
    formData1.append("PASSWORD", PASSWORD);
    formData1.append("ADDRESS", NEWADDRESS);
    formData1.append("NEWPROFILEIMG", NEWUPROFILE);
    const mailSend = async () => {
      try {
        const responseForSignup = await axios.post(
          "https://ezsell-backend.vercel.app/user/updating",
          formData1,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (responseForSignup.data === 1) {
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        }
      } catch (error) {
        console.log("Signup error", error);
        alert("Something went wrong please try later");
      }
    };
    mailSend();
  };
  const password_submit = (event) => {
    event.preventDefault();
    console.log(PASSWORD);
    const mailSend = async () => {
      try {
        const responseForSignup = await axios.post(
          "https://ezsell-backend.vercel.app/user/update/password",
          { PASSWORD },
          {
            withCredentials: true,
          }
        );
        if (responseForSignup.data === 1) {
          alert("check mail");
        } else {
          alert("Something went wrong please try later");
        }
      } catch (error) {
        console.log("Signup error", error);
        alert("Something went wrong please try later");
      }
    };
    mailSend();
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };
  const give_feedback = async () => {
    if (FEEDBACK_HERE !== "") {
      try {
        const feedback_response = await axios.post(
          "https://ezsell-backend.vercel.app/user/feedback",
          { FEEDBACK_HERE },
          { withCredentials: true }
        );
        if (feedback_response.data === 1) {
          window.location.reload(false);
        }
      } catch {
        alert("please try again later");
      }
    } else {
      alert("please enter feedback");
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
    setnewuserprofile(e.target.files[0]);
    const file = e.target.files[0];
    console.log("object", file);
    const base64 = await convertToBase64(file);
    setimg(base64);
  };
  return (
    <>
      <Navbar confirm={1} />
      <div className={`${bg} ${mode} `}>
        <div className="cont">
          <div className="container-fluid ">
            <div className="row ptop">
              <div className={`row ${mycss12.formobile1}`}>
                <button
                  className={` btn btn-primary ms-2 mt-3 centre mb-2 col-2 `}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                >
                  Menu
                </button>
              </div>
              <div
                className="offcanvas offcanvas-start "
                data-bs-scroll="true"
                tabindex="-1"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
              >
                <div className="offcanvas-header">
                  <h5
                    className="offcanvas-title"
                    id="offcanvasWithBothOptionsLabel"
                  >
                    {FULLNAME}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div className={`${mycss12.left} ${mycss12.left1} `}>
                    <ul className={`nav nav-pills flex-column`}>
                      <li>
                        <a
                          className={`nav-link  ${mode} mt-2 d-grid gap-2 d-md-block `}
                          href="#PROFILE"
                          aria-label="Close"
                          data-bs-dismiss="offcanvas"
                        >
                          <button
                            className={` ${mode} btn ${mycss12.a1}`}
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          >
                            Profile
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          className={`nav-link  ${mode} mt-2 d-grid gap-2 d-md-block `}
                          href="#CHANGE"
                          aria-label="Close"
                          data-bs-dismiss="offcanvas"
                        >
                          <button
                            className={` ${mode} btn ${mycss12.a1}`}
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          >
                            Edit
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          className={`nav-link  ${mode} mt-2 d-grid gap-2 d-md-block `}
                          href="#SETTINGS"
                          aria-label="Close"
                          data-bs-dismiss="offcanvas"
                        >
                          <button
                            className={` ${mode} btn ${mycss12.a1}`}
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          >
                            Settings
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          className={`nav-link  ${mode} mt-2 d-grid gap-2 d-md-block `}
                          href="#FEEDBACK"
                          aria-label="Close"
                          data-bs-dismiss="offcanvas"
                        >
                          <button
                            className={` ${mode} btn ${mycss12.a1}`}
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          >
                            Feedback
                          </button>
                        </a>
                      </li>
                      {ROLE === "N_USER" && (
                        <>
                          <li>
                            <a
                              className={`nav-link  ${mode} mt-2 d-grid gap-2 d-md-block `}
                              href="#HISTORY"
                              aria-label="Close"
                              data-bs-dismiss="offcanvas"
                            >
                              <button
                                className={` ${mode} btn ${mycss12.a1}`}
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                              >
                                History
                              </button>
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`col-auto ${mycss12.formobile2}`}>
                <nav
                  id="navbar-example3"
                  className={`h-100 flex-column align-items-stretch pe-4 ps-4 border-end`}
                >
                  <nav className="nav nav-pills flex-column">
                    <div className={`${mycss12.left} ${mycss12.left1} `}>
                      <ul className={`nav  flex-column`}>
                        <li>
                          <a
                            className={`nav-link ${mode} ms-1 mt-2 centre  ${mycss12.a1}`}
                            href="#PROFILE"
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className={`nav-link ${mode} ms-1 mt-2 centre ${mycss12.a1}`}
                            href="#CHANGE"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className={`nav-link ${mode} ms-1 mt-2 centre ${mycss12.a1}`}
                            href="#SETTINGS"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            className={`nav-link ${mode} ms-1 mt-2 centre ${mycss12.a1}`}
                            href="#FEEDBACK"
                          >
                            Feedback
                          </a>
                        </li>
                        {ROLE === "N_USER" && (
                          <>
                            <li>
                              <a
                                className={`nav-link ${mode} ms-1 mt-2 centre ${mycss12.a1}`}
                                href="#HISTORY"
                              >
                                History
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </nav>
                </nav>
              </div>
              <div className={`col`}>
                <div className="row">
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example3"
                    data-bs-smooth-scroll="true"
                    className="scrollspy-example-2"
                    tabindex="0"
                  >
                    <div className={`${mycss12.left} ${mycss12.left1} `}>
                      <div id="PROFILE">
                        <div className="row me-1">
                          <div
                            className={`col-md-4 mb-2 centre ${mycss12.formobile1}`}
                          >
                            <label htmlFor="exampleFormControlInput5">
                              <img
                                src={UPROFILE}
                                alt="Unable to load.."
                                className="rounded-circle"
                                width="250px"
                                height="250px"
                              />
                            </label>
                          </div>
                          <div className="col-md-8 ">
                            <p className="fs-5">Name : {FULLNAME}</p>
                            <p className="fs-5">Email : {EMAIL}</p>
                            <p className="fs-5">Phone : {PHONE}</p>
                            <p className="fs-5">Address :{ADDRESS}</p>
                            {ROLE === "N_USER" && (
                              <>
                                <p className="fs-5">
                                  Total posts : {BLOGCOUNT}
                                </p>
                              </>
                            )}
                          </div>
                          <div
                            className={`col-md-4 centre ${mycss12.formobile2}`}
                          >
                            <label htmlFor="exampleFormControlInput5">
                              <img
                                src={USERPROF || UPROFILE}
                                alt="Unable to load.."
                                className="rounded-circle"
                                width="250px"
                                height="250px"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <hr className={mode} />
                      <div id="CHANGE">
                        <div className="fs-3  ">
                          <u>Edit Details</u>
                        </div>
                        <br />
                        <figcaption
                          className={`text-${mode} blockquote-footer `}
                        >
                          you are free to edit any of your details
                        </figcaption>
                        <div className="row me-1">
                          <div className={`col-auto mt-2 mb-2`}>
                            <form
                              onSubmit={handlenewsubmit}
                              enctype="multipart/form-data"
                            >
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-6 ">
                                    <div className={`mb-3`}>
                                      <label
                                        for="exampleInputEmail3"
                                        className={`form-label `}
                                      >
                                        Name:
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${mycss12.a1} `}
                                        id="exampleInputEmail3"
                                        aria-describedby="emailHelp"
                                        value={NEWNAME}
                                        onChange={(e) =>
                                          setnewname(e.target.value)
                                        }
                                        name="EMAIL"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6 ">
                                    <div className={`col mb-3`}>
                                      <label
                                        htmlFor="exampleFormControlInput5"
                                        className={`form-label `}
                                      >
                                        Profile:
                                      </label>
                                      <input
                                        type="file"
                                        className={`form-control ${mycss12.a1} `}
                                        id="exampleFormControlInput5"
                                        onChange={(e) => handleFileUpload(e)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6 ">
                                    <div className={`mb-3`}>
                                      <label
                                        for="exampleInputEmailn"
                                        className={`form-label `}
                                      >
                                        Address:
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control  ${mycss12.a1}`}
                                        id="exampleInputEmailn"
                                        aria-describedby="emailHelp"
                                        value={NEWADDRESS}
                                        onChange={(e) =>
                                          setnewaddress(e.target.value)
                                        }
                                        name="EMAIL"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 ">
                                    <div className={`mb-1`}>
                                      <label
                                        htmlFor="exampleInputEmail2"
                                        className={`form-label`}
                                      >
                                        Phone No:
                                      </label>
                                      <input
                                        type="number"
                                        className={`form-control`}
                                        id="exampleInputEmail2"
                                        aria-describedby="emailHelp"
                                        value={NEWPHONE}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          if (
                                            value.length <= 10 &&
                                            /^[0-9]*$/.test(value)
                                          ) {
                                            setnewphone(value);
                                          }
                                        }}
                                        name="NAME"
                                        maxLength="10"
                                        minLength="10"
                                        title="Phone number must be 10 digits"
                                      />
                                    </div>
                                  </div>
                                  <div className={`col-md-2  ${mycss12.gd}`}>
                                    <button
                                      type="submit"
                                      className={`btn btn-primary mt-3`}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                            <hr className={mode} width="50%" />
                            <form onSubmit={(e) => password_submit(e)}>
                              <div className="row mb-4">
                                <div className="col-md-6">
                                  <div className={`mb-3`}>
                                    <label
                                      for="exampleInputPassword6"
                                      className={`form-label `}
                                    >
                                      Update Password:
                                    </label>
                                    <input
                                      type="password"
                                      className={`form-control ${mycss12.a1} `}
                                      id="exampleInputPassword6"
                                      name="PASSWORD"
                                      value={PASSWORD}
                                      onChange={(e) =>
                                        setnewpass(e.target.value)
                                      }
                                      required="true"
                                    />
                                  </div>
                                </div>
                                <div className={`col-md-1  ${mycss12.gd}`}>
                                  <button
                                    type="submit"
                                    className={`btn btn-primary mt-3`}
                                  >
                                    Update Password
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <hr className={mode} />
                      <div id="SETTINGS">
                        <div className="row me-1">
                          <div className="col-md-12">
                            <div className="fs-3 mb-2 ">
                              <u>Settings</u>
                            </div>
                            <hr className={mode} width="50%" />
                            <div className="fs-4 mb-2 ">
                              <u>Change Background</u>
                            </div>
                            <div className="row mt-2 mb-2">
                              <div className="col-md-5">
                                <div className={`row `}>
                                  <div
                                    className={`col-md-6 mb-4 ${mycss12.images} dark centre`}
                                  >
                                    Plain Background
                                  </div>
                                  <div className="col centre  " width="200px">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(0)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-4 mb-2">
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg8.jpg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(8)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(8)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg7.jpeg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(7)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(7)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2 mb-2">
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg6.jpg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(6)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(6)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg5.jpeg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(5)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(5)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row mt-2 mb-2">
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg1.jpg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(1)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(1)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg2.jpg"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(2)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(2)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row mt-2 mb-2">
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg3.webp"
                                      alt="Unable to load at the moment"
                                      width="250px"
                                      onClick={() => changebg(3)}
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(3)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 mb-3">
                                <div className={`row `}>
                                  <div className="col-md-6 mb-3 centre ">
                                    <img
                                      src="https://ezsell-backend.vercel.app/backgrounds/bg4.webp"
                                      alt="Unable to load at the moment"
                                      onClick={() => changebg(4)}
                                      width="250px"
                                      className={`${mycss12.images}`}
                                    />
                                  </div>
                                  <div className="col centre ">
                                    <button
                                      className="btn btn-success"
                                      onClick={() => changebg(4)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2 mb-2"></div>
                          </div>
                        </div>
                      </div>
                      <hr className={mode} />
                      <div id="FEEDBACK">
                        <div className="row me-1">
                          <div className="col-md-12">
                            <div className="fs-4 mb-2 ">
                              <u>Give Feedback !</u>
                            </div>
                            <br />
                            <label
                              className={`text-${mode} blockquote-footer fs-4`}
                              htmlFor="exampleFormControlTextarea1"
                            >
                              We value your input. Please share your feedback to
                              help us make our website better for you
                            </label>
                            <br />
                            <textarea
                              className={`${
                                mode === "dark" ? "light" : "dark"
                              } form-control `}
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={FEEDBACK_HERE}
                              onChange={(e) => {
                                setfeedback(e.target.value);
                              }}
                              placeholder="Your feedback here"
                            ></textarea>

                            <button
                              className={`btn btn-outline-${mode} mt-3 mb-3 ms-3`}
                              onClick={() => give_feedback()}
                            >
                              Submit Feedback
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className={mode} />
                      {ROLE === "N_USER" && (
                        <>
                          <div id="HISTORY">
                            <div className="row me-1">
                              {}
                              <div className="fs-4 mb-2 ">
                                <u>History</u>
                              </div>
                              <div className="row">
                                <div className="col-md-8 ms-2 me-2 mt-3 mb-4">
                                  {list.map((post_detail) => (
                                    <Historyitem data={post_detail} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      )}
                      <br />
                      <br />
                      <br />
                      <br /> <br />
                      <br />
                      <br />
                      <br /> <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={` container-fluid`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
