import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useTheme } from "../ThemeContext";
import buyer_img from "../images/buyer-image.jpg";
import axios from "axios";
import { Item } from "./Item";
import "../common.css";
import mycss1 from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
export const Buyerhome = () => {
  const { mode, aaa, changebg, bg } = useTheme();
  // const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [Confirmation, setconfirmation] = useState(1);
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

    const user_details = async () => {
      try {
        const response1 = await axios.post(
          "https://ezsell-backend.vercel.app/user",
          {},
          {
            withCredentials: true,
          }
        );
        if (response1.data !== 0) {
          setviewer(response1.data);
          setconfirmation(1);
          changebg(response1.data.back);
          fetchBuyerData();
        } else {
          setconfirmation(3);
        }
      } catch (error) {
        console.log("Signup error", error);
      }
    };
    user_details();
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 120000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar confirm={Confirmation} />

      <div className={`${bg} ${mode} `}>
        <div className="cont">
          <div className="container ptop ">
            <div className="row pt-4 mb-4">
              <div
                className={`col-12 ${aaa} full  `}
                style={{ maxHeight: "645px" }}
              >
                <div className="row">
                  <div
                    className={`col-12 border-right mt-1 rounded ${mycss1.forflow} `}
                    style={{ maxHeight: "600px" }}
                  >
                    <br />
                    {list.map((post_detail) => {
                      if (post_detail.user.email !== viewer.email) {
                        return (
                          <Item
                            key={post_detail.id} // Include a key prop for better performance
                            data={post_detail}
                            userrole={"BUYER"}
                            view={viewer}
                          />
                        );
                      } else {
                        return null; // If the condition is not met, return null to avoid rendering anything.
                      }
                    })}
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
