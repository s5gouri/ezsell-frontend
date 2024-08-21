import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../common.css";
import mycss6 from "./Landpage.module.css";
import land1 from "../images/landingnew1.jpg";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export const Landpage = () => {
  const [Confirmation, setconfirmation] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    window.location.href = "https://ezsell-sg.vercel.app";

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
          console.log(response1.data);
          console.log(response1.data.profileimg);
          setconfirmation(1);
        }
      } catch (error) {
        console.log("Signup error-->", error);
      }
    };

    user_details();
  }, [navigate]);

  const start = () => {
    navigate("/signup");
  };
  const start2 = () => {
    navigate("/signin");
  };

  return null;
  // <>
  //   <Navbar confirm={Confirmation} />
  //   <div className="cont">
  //     <div className="container-fluid pt-5">
  //       <div className="row pt-2">
  //         <div className={`col-md ${mycss6.bold}`}>
  //           <div className=" centre">ezSell</div>
  //         </div>
  //         <div className="col-md ">
  //           <div className="row ">
  //             <div className="col-md-6">
  //               <div className="h3">The Smart Way to Declutter</div>
  //               <p>
  //                 EzSell is your go-to platform for effortlessly selling your
  //                 old items online. Whether it's electronics, furniture, or
  //                 clothing, we make the process simple and stress-free. With
  //                 just a few clicks, you can turn your unused belongings into
  //                 cash. Say goodbye to clutter and hello to a more organized,
  //                 hassle-free life.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className={`${mycss6.txt_img} row `}>
  //         <img
  //           src={land1}
  //           alt="Unablle to load.."
  //           className={`img-fluid rounded`}
  //           style={{ maxHeight: "350px" }}
  //         />
  //       </div>
  //       <div className="row pt-1 centre pb-2 ">
  //         <div className="col-md-3 centre">
  //           <div className="row centre">
  //             <div className="col centre">
  //               <button
  //                 type="button"
  //                 class="btn btn-info btn-lg "
  //                 onClick={() => {
  //                   start();
  //                 }}
  //               >
  //                 Get Started
  //               </button>
  //             </div>
  //             <div className="col centre h4">OR</div>
  //             <div className="col centre">
  //               <button
  //                 type="button"
  //                 class="btn btn-info btn-lg "
  //                 onClick={() => {
  //                   start2();
  //                 }}
  //               >
  //                 Continue Selling
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="row pt-5 pb-1 "
  //         style={{ backgroundColor: "#323A44", color: "white" }}
  //       >
  //         <div className="col-md-5  ">
  //           <div className="row centre">
  //             <div className="col-md-6">
  //               <div className="h3">User-Friendly Interface</div>
  //               <p>
  //                 At EzSell, we've designed a user-friendly interface that
  //                 makes selling your items quick and easy. Whether you're
  //                 tech-savvy or not, our platform guides you through each
  //                 step, from listing your items to closing the deal. No
  //                 complicated procedures, just a smooth and straightforward
  //                 experience.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={`col-md ${mycss6.bold1}`}>
  //           <div className=" centre">
  //             Simple, easy-to-use platform for everyone
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="row centre pt-5 pb-1"
  //         style={{ backgroundColor: "#0B93B2", color: "white" }}
  //       >
  //         <div className="col-md-5">
  //           <div className="row centre">
  //             <div className="col-md-12">
  //               <div className="h1">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="80"
  //                   height="80"
  //                   fill="currentColor"
  //                   class="bi bi-arrow-bar-right"
  //                   viewBox="0 0 16 16"
  //                 >
  //                   <path
  //                     fill-rule="evenodd"
  //                     d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
  //                   />
  //                 </svg>
  //                 <u>Secure Transactions</u>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row centre">
  //             <div className="col-md-8">
  //               Your security is our top priority. EzSell ensures that all
  //               transactions are safe and secure, protecting both buyers and
  //               sellers. We use the latest encryption technology to safeguard
  //               your information, giving you peace of mind as you sell your
  //               items to trustworthy buyers.
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="row centre pt-5 pb-1"
  //         style={{ backgroundColor: "#323A44", color: "white" }}
  //       >
  //         <div className="col-md-5">
  //           <div className="row centre">
  //             <div className="col-md-12">
  //               <div className="h1">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="80"
  //                   height="80"
  //                   fill="currentColor"
  //                   class="bi bi-arrow-bar-right"
  //                   viewBox="0 0 16 16"
  //                 >
  //                   <path
  //                     fill-rule="evenodd"
  //                     d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
  //                   />
  //                 </svg>
  //                 <u>Eco-Friendly Selling</u>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row centre">
  //             <div className="col-md-8">
  //               Selling your old items on EzSell isn't just good for your
  //               wallet—it's good for the planet too. By giving your items a
  //               second life, you're reducing waste and contributing to a more
  //               sustainable future. Join us in making a positive impact, one
  //               sale at a time.
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="row centre pt-5 pb-1"
  //         style={{ backgroundColor: "#0B93B2", color: "white" }}
  //       >
  //         <div className="col-md-5">
  //           <div className="row centre">
  //             <div className="col-md-12">
  //               <div className="h2">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="80"
  //                   height="80"
  //                   fill="currentColor"
  //                   class="bi bi-arrow-bar-right"
  //                   viewBox="0 0 16 16"
  //                 >
  //                   <path
  //                     fill-rule="evenodd"
  //                     d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
  //                   />
  //                 </svg>
  //                 <u>Simple Pricing, No Hidden Fees</u>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row centre">
  //             <div className="col-md-8">
  //               We believe in transparency, which is why EzSell offers simple,
  //               straightforward pricing. There are no hidden fees or
  //               surprises—just a clear, affordable structure that makes
  //               selling your items easy and profitable. Keep more of what you
  //               earn with EzSell.
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="row centre pt-5 pb-1"
  //         style={{ backgroundColor: "#323A44", color: "white" }}
  //       >
  //         <div className="col-md-5">
  //           <div className="row centre">
  //             <div className="col-md-12">
  //               <div className="h1">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="80"
  //                   height="80"
  //                   fill="currentColor"
  //                   class="bi bi-arrow-bar-right"
  //                   viewBox="0 0 16 16"
  //                 >
  //                   <path
  //                     fill-rule="evenodd"
  //                     d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
  //                   />
  //                 </svg>
  //                 <u>24/7 Customer Support</u>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row centre">
  //             <div className="col-md-8">
  //               At ezSell, we're here to help whenever you need it. Our
  //               dedicated customer support team is available 24/7 to assist
  //               you with any questions or issues. Whether you need help
  //               listing an item or completing a transaction, we're just a
  //               click away, ensuring a seamless experience.
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className={`${mycss6.foot} container-fluid`}>
  //       <div className="row centre">
  //         {" "}
  //         <p>© 2024 ezSell. All rights reserved.</p>
  //         <br />
  //         <figcaption class="blockquote-footera blockquote-footer">
  //           Made by Sahil Gouri
  //         </figcaption>
  //       </div>
  //     </div>
  //   </div>
  // </>
};
