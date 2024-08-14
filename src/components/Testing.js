import React, { useState, useEffect } from "react";
import "../common.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Historyitem } from "./Historyitem";
import { useTheme } from "../ThemeContext";
import mycss4 from "./Userprofile.module.css";
import { Footer } from "./Footer";
export const Testing = () => {
  const { mode, toggleMode, changebg, bg } = useTheme();
  const [FULLNAME, setname] = useState("");
  const [UPROFILE, setuserprofile] = useState("/");
  const [PHONE, setphone] = useState("");
  const [EMAIL, setemail] = useState("");
  const [ADDRESS, setaddress] = useState("");

  const [NEWNAME, setnewname] = useState("");
  const [NEWUPROFILE, setnewuserprofile] = useState();
  const [NEWADDRESS, setnewaddress] = useState("");
  const [NEWPHONE, setnewphone] = useState("");
  const [NEWEMAIL, setnewemail] = useState("");
  const [PASSWORD, setnewpass] = useState("");

  const [BLOGCOUNT, setcount] = useState(0);
  const [POSTLIST, setlist] = useState([]);
  const [ROLE, setrole] = useState("N_USER");
  const [confirmation, setconfirmation] = useState(0);
  const [FEEDBACK_HERE, setfeedback] = useState("");
  const [list, setlist2] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const get_history = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/history",
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
          "http://localhost:8000/user/profile",
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
          setuserprofile(
            `http://localhost:8000${response1.data.user.profileimg}`
          );
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
          "http://localhost:8000/user/updating",
          formData1,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (responseForSignup.data === 1) {
          alert("check mail");
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
  const password_submit = (event) => {
    event.preventDefault();
    console.log(PASSWORD);
    const mailSend = async () => {
      try {
        const responseForSignup = await axios.post(
          "http://localhost:8000/user/update/password",
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
          "http://localhost:8000/user/feedback",
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
  return <>hii</>;
};
