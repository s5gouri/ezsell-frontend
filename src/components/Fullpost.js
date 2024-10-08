import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../common.css";
import mycss3 from "./Fullpost.module.css";
import { Navbar } from "./Navbar";
import { useTheme } from "../ThemeContext";
import { Footer } from "./Footer";
export const Fullpost = () => {
  const navigate = useNavigate();

  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  const [show, setshow] = useState(0);
  const [status, setstatus] = useState(33);
  const [tellstatus, settellstatus] = useState("UNDER PROCESS");
  const [selected, setselected] = useState(0);
  const [USER, setuser] = useState("");
  const [buyers_list, setlist] = useState([]);
  const urole = useRef("");
  const [send, setsend] = useState(false);

  const location = useLocation();
  const { all_data, user, role } = location.state;
  useEffect(() => {
    urole.current = role;
    setuser(user);
    setlist(all_data.buyers);
    if (all_data.final_buyer.length === 1) {
      console.log("yesssss");
      if (all_data.final_buyer[0].email === user.email) {
        console.log(all_data.final_buyer.length);
        setshow(2);
        console.log(show);
      }
    }
    if (all_data.buyers[0] !== "selected") {
      all_data.buyers.forEach((person) => {
        console.log("buyer here");
        if (person.email === user.email) {
          setshow(1);
        }
      });
    }
    if (all_data.status === "--buyer selected--") {
      setstatus(66);
      settellstatus("BUYER SELECTED WILL REACH SOON !!");
    } else if (all_data.status === "--deal done--") {
      setstatus(100);
      settellstatus("THE DEAL IS COMPLETED");
    }

    if (all_data.final_buyer.length !== 0) {
      setselected(all_data.final_buyer[0]);
    }
  }, []);

  const fetch_new_data = async () => {
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/user/singlepost",
        { post_id: all_data._id },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response.data);
        setlist(response.data.buyers);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const send_request = async () => {
    setsend(true);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/rag/send-request",
        { item_id: all_data._id, buyer: USER },
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert("Request sent");
        setshow(1);
        console.log("=====", show);
      } else if (response.data === 2) {
        setshow(1);
      } else {
        alert("Unable to send request please try later");
      }
    } catch {
      alert("Unable to send request please try later");
    }
    setsend(false);
  };

  const set = async (person) => {
    setsend(true);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/rag/accept-request",
        { item_id: all_data._id, buyer: person },
        { withCredentials: true }
      );
      if (response.data === 1) {
        setselected(person);
        alert("Buyer Selected");
        setstatus(66);
        settellstatus("SELECTED BUYER WILL REACH SOON !!");
      } else if (response.data === 2) {
        alert("Buyer Selected Details will update soon");
      } else {
        alert("Unable to send request please try later");
      }
    } catch {
      alert("Unable to send request please try later");
    }
    setsend(false);
  };
  const cancle_Deal = async (person) => {
    setsend(true);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/rag/cancle-request",
        { item_id: all_data._id, buyer: person },
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert("Buyer removed");
        fetch_new_data();
      } else {
        alert("Unable to cancle request please try later");
      }
    } catch {
      alert("Unable to cancle request please try later");
    }
    setsend(false);
  };

  const done = async () => {
    setsend(true);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/rag/completed",
        { item_id: all_data._id },
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert("Deal Done");
        setstatus(100);
        settellstatus("THE DEAL IS COMPLETED");
        navigate("/user/dashboard");
      } else {
        alert("Unable to send request please try later");
      }
    } catch {
      alert("Unable to send request please try later");
    }
    setsend(false);
  };
  const Delete_post = async () => {
    setsend(true);
    try {
      const response = await axios.post(
        "https://ezsell-backend.vercel.app/rag/delete-post",
        { item_id: all_data._id },
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert("Post Deleted");
        navigate("/user/dashboard");
      } else {
        alert("Unable to send request please try later");
      }
    } catch {
      alert("Unable to send request please try later");
    }
    setsend(false);
  };
  const openImage = () => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${all_data.image}" alt="Image" />`);
  };
  const handleCopyClick = (pnumber) => {
    const tempInput = document.createElement("input");
    tempInput.value = pnumber;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Number copied to clipboard!");
  };

  return (
    <>
      <Navbar confirm={1} />
      <div className={`${bg} ${mode}`}>
        <div className="cont">
          <div className="container ptop">
            <div className="row pt-4 mb-4">
              <div
                className={`col-12 ${aaa} full ${mycss3.forflow} `}
                style={{ maxHeight: "610px" }}
              >
                <div className="row mt-3">
                  <div className="col-md-6 ">
                    <div
                      className="col-12 centre"
                      style={{ cursor: "pointer" }}
                      onClick={openImage}
                    >
                      <div className="col-12 centre">
                        <div className={`${mycss3.onhovtext} centre fs-3`}>
                          click to full view
                        </div>
                        <img
                          src={all_data.image}
                          alt="Unable to load at the moment"
                          className={`img-fluid rounded ${mycss3.hovimg}`}
                          style={{ maxWidth: "550px", maxHeight: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 centre">
                    <div className="row">
                      <div className={` fs-2  centre   mb-3 `}>
                        <u>{all_data.title}</u>
                      </div>
                      <div className={` fs-2  centre   mb-3 `}>
                        Estimated price:
                        {all_data.price}
                      </div>
                      {urole.current === "BUYER" && (
                        <>
                          <div className=" centre  fs-3">
                            Location :{all_data.user.adderess}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`row mt-2 mb-4 cont`}
                  style={{ maxHeight: "180px" }}
                >
                  <div className="col-12 ">
                    <div className="fs-5 mb-4  ">
                      <u>Description</u>
                    </div>
                    <pre className="fs-6">{all_data.description}</pre>
                  </div>
                </div>
                {urole.current === "N_USER" && (
                  <>
                    <div className="row mt-2 mb-2 centre">
                      <div className="col-12">
                        <small
                          className={` ${
                            mode === "dark" ? "white" : "black"
                          }text-body-secondary fs-4`}
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
                      </div>
                    </div>
                  </>
                )}

                <div className="row mt-2 centre mb-3">
                  <div className="col-md-4 ">
                    <div className="row">
                      {urole.current === "BUYER" && show === 0 && (
                        <>
                          <button
                            className={`btn btn-outline-success fs-5 `}
                            disabled={send}
                            onClick={send_request}
                          >
                            {send === true
                              ? "Please wait..."
                              : "Send Confirmation"}
                          </button>
                        </>
                      )}
                    </div>
                    <div className="row">
                      {urole.current === "BUYER" && show === 2 && (
                        <>
                          <div className="fs-2 centre">
                            U have been selected
                          </div>
                          <div className="centre">
                            {all_data.user.qrcode !== "null" && (
                              <>
                                <a
                                  className="btn btn-success centre me-1 ms-4"
                                  style={{
                                    maxHeight: "40px",
                                    maxWidth: "200px",
                                  }}
                                  href={all_data.user.qrcode}
                                  target="_main"
                                >
                                  Pay the Amount to user
                                </a>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {show === 1 && (
                      <>
                        <div className="fs-2">Requested </div>
                      </>
                    )}
                  </div>
                </div>
                {urole.current === "N_USER" &&
                  buyers_list.length !== 0 &&
                  selected === 0 && (
                    <>
                      <div className="row mt-2 ms-1 me-1">
                        <div
                          className={` ${mycss3.buyerlist} col-12  mt-1 mb-1`}
                        >
                          {buyers_list.map((person) => (
                            <>
                              <div
                                className={`mt-2 col-12 ${mycss3.buyerlist} ms-1 mb-2 me-1  `}
                              >
                                <div className="row">
                                  <div className="col-md-6 ">
                                    <div className="row centre">
                                      <div
                                        className={`col-2  ${mycss3.centre}`}
                                      >
                                        <img
                                          src={person.profileimg}
                                          alt="loading"
                                          className={`rounded-circle mt-1 mb-1 ms-1  `}
                                          width="42px"
                                          height="42px"
                                        />
                                      </div>
                                      <div
                                        className={`col-2 ${mycss3.forflow}  `}
                                      >
                                        {person.name}
                                      </div>
                                      <div className="col-3">
                                        <div className={`col ${mycss3.hide}`}>
                                          Interested
                                        </div>
                                      </div>
                                      <div className="col-5">
                                        <div className="ms-2">
                                          Phone no. :{person.phone}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 centre mt-1 mb-1 ">
                                    <div className="col flex-row-reverse d-flex ">
                                      <button
                                        className="btn btn-danger me-3"
                                        disabled={send}
                                        onClick={() => cancle_Deal(person)}
                                      >
                                        {send === true
                                          ? "Please wait..."
                                          : "Decline"}
                                      </button>
                                      <button
                                        className="btn btn-success me-1"
                                        disabled={send}
                                        onClick={() => set(person)}
                                      >
                                        {send === true
                                          ? "Please wait..."
                                          : "Accept"}
                                      </button>

                                      <button
                                        className="btn btn-primary me-1 centre"
                                        style={{ maxHeight: "40px" }}
                                        onClick={() =>
                                          handleCopyClick(person.phone)
                                        }
                                      >
                                        Copy Number
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                {selected !== 0 && urole.current === "N_USER" && (
                  <>
                    <>
                      <div className="row mt-2">
                        <div className={`  col-12 centre mt-1 mb-1`}>
                          <div
                            className={`mt-1 col-12 ${mycss3.buyerlist} ms-1 mb-1 me-1  `}
                          >
                            <div className="row">
                              <div className={`col-md-7 `}>
                                <div className="row centre">
                                  <div className={`col-2 ${mycss3.centre}`}>
                                    <img
                                      src={selected.profileimg}
                                      alt="loading"
                                      className={`rounded-circle mt-1 mb-1 ms-1  `}
                                      width="42px"
                                      height="42px"
                                    />
                                  </div>
                                  <div className={`col-2  ${mycss3.forflow}  `}>
                                    {selected.name}
                                  </div>
                                  <div className="col-3 ">
                                    <div className={`col ${mycss3.hide}`}>
                                      Buyer Selected
                                    </div>
                                  </div>
                                  <div className="col-5">
                                    <div className="ms-2">
                                      Phone no. :{selected.phone}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-5 centre mb-1 mt-1 ">
                                <div className="col d-flex  justify-content-end">
                                  <button
                                    className="btn btn-primary me-1 centre"
                                    style={{ maxHeight: "40px" }}
                                    onClick={() =>
                                      handleCopyClick(selected.phone)
                                    }
                                  >
                                    Copy No.
                                  </button>
                                  <button
                                    className="btn btn-success me-2"
                                    onClick={() => done()}
                                    disabled={send}
                                    style={{ maxHeight: "40px" }}
                                  >
                                    {send === true ? "Please wait..." : "Done"}
                                  </button>
                                  <button
                                    className="btn btn-danger me-1 centre"
                                    onClick={() => Delete_post()}
                                    disabled={send}
                                    style={{ maxHeight: "40px" }}
                                  >
                                    {send === true
                                      ? "Please wait..."
                                      : "Cancle Deal"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
