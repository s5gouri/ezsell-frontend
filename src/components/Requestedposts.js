import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useTheme } from "../ThemeContext";
// import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Item } from "./Item";
import "../common.css";
import mycss8 from "./Dashboard.module.css";
import { Footer } from "./Footer";
export const Requestedposts = () => {
  const { mode, toggleMode, aaa, changebg, bg } = useTheme();
  // const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [confirmation, setconfirmation] = useState(0);
  const [ROLE, setrole] = useState("N_USER");
  const [viewer, setviewer] = useState(0);
  // request to get list of posts created
  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/rag/requested/rags",
          {},
          {
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
          "http://localhost:8000/user",
          {},
          {
            withCredentials: true,
          }
        );
        if (response1.data !== 0) {
          setconfirmation(1);
          console.log(response1.data);
          setviewer(response1.data);
          setrole("BUYER");
          fetchBuyerData();
          // changebg(response1.data.back);
        } else {
          setconfirmation(0);
        }
      } catch (error) {
        console.log("Signup error", error);
      }
    };
    user_details();
  }, []);
  console.log("]]]]]]]]]]]]]]]]]]", viewer);
  return (
    <>
      <Navbar confirm={confirmation} />

      <div className={`${bg} ${mode} `}>
        <div className="cont">
          <div className="container ptop ">
            <div className="row pt-4 mb-4">
              <div
                className={`col-12 ${aaa} full  `}
                style={{ maxHeight: "750px" }}
              >
                <div className="row">
                  <div
                    className={`col-md-12 border-right mt-1 rounded ${mycss8.forflow} `}
                    style={{ maxHeight: "750px" }}
                  >
                    {list.length === 0 && (
                      <>
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <div className="fs-1 text-center">
                                No Requested Posts
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {list.map((post_detail) => (
                      <>
                        <Item
                          data={post_detail}
                          userrole={ROLE}
                          view={viewer}
                        />
                      </>
                    ))}
                  </div>
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
