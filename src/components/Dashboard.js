import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useTheme } from "../ThemeContext";
import buyer_img from "../images/buyer-image.jpg";
import axios from "axios";
import { Item } from "./Item";
import "../common.css";
import mycss1 from "./Dashboard.module.css";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
export const Dashboard = () => {
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  // const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [confirmation, setconfirmation] = useState(1);
  const [ROLE, setrole] = useState("BUYER");
  const [viewer, setviewer] = useState(0);
  // request to get list of posts created
  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const response = await axios.post(
          "https://ezsell-backend.vercel.app/rag/find-rag",
          {},
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          console.log(response.data);

          setlist(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchSellerData = async () => {
      try {
        const response = await axios.post(
          "https://ezsell-backend.vercel.app/user/allposts",
          {},
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          console.log(response.data);

          setlist(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const user_details = async () => {
      try {
        const response1 = await axios.post(
          "https://ezsell-backend.vercel.app/user",
          {},
          {
            withCredentials: true,
          }
        );
        if (response1.data.role === "N_USER") {
          setviewer(response1.data);
          setconfirmation(1);
          setrole("N_USER");
          changebg(response1.data.back);
          fetchSellerData();

          console.log("Seller Detected");
        } else if (response1.data.role === "BUYER") {
          setviewer(response1.data);
          setrole("BUYER");
          setconfirmation(2);
          // changebg(response1.data.back);

          fetchBuyerData();
        } else {
          setconfirmation(3);
        }
      } catch (error) {
        console.log("Signup error", error);
      }
    };
    user_details();
  }, []);

  return (
    <>
      <Navbar confirm={confirmation} />

      <div className={`${bg} ${mode} `}>
        <div className="cont">
          <div className="container ptop ">
            <div className="row pt-4 mb-4">
              <div
                className={`col-12 ${aaa} full  `}
                style={{ maxHeight: "645px" }}
              >
                <div className="row">
                  {ROLE === "N_USER" && (
                    <>
                      <div
                        className={`col-md-8 border-right mt-1 rounded ${mycss1.forflow} `}
                        style={{ maxHeight: "600px" }}
                      >
                        {ROLE === "N_USER" && (
                          <>
                            <div className="fs-4 mb-4 ">
                              <u>Your posts</u>
                            </div>
                          </>
                        )}
                        <br />
                        {list.length === 0 && (
                          <Link to="/user/sell-post">
                            <div
                              className={` fs-1 ${
                                mode === "dark" ? "text-dark" : "text-light"
                              }`}
                            >
                              Start Selling
                            </div>
                          </Link>
                        )}

                        {list.map((post_detail) => (
                          <Item
                            data={post_detail}
                            userrole={ROLE}
                            view={viewer}
                          />
                        ))}
                      </div>

                      <div className={`col-md-4 ${mycss1.right}`}>
                        <div className="row centre">
                          <div className="fs-3 centre">Our top Buyers</div>
                          <div className="ima centre mt-4">
                            <img
                              src={buyer_img}
                              className=" rounded-circle"
                              alt="Unable to load at the moment..."
                              width="250px"
                              height="200px"
                            />
                          </div>
                          <p className="fs-5">Name : Rajesh Kumar</p>
                          <p className="fs-5">Address :New Delhi</p>
                          <p className="fs-5">Ratings :⭐⭐⭐⭐</p>
                        </div>
                      </div>
                    </>
                  )}
                  {ROLE === "BUYER" && (
                    <>
                      <div
                        className={`col-12 border-right mt-1 rounded ${mycss1.forflow} `}
                        style={{ maxHeight: "600px" }}
                      >
                        <br />
                        {list.map((post_detail) => (
                          <Item
                            data={post_detail}
                            userrole={ROLE}
                            view={viewer}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
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
