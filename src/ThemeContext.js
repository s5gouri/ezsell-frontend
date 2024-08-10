import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [aaa, setaaa] = useState("aaa1");
  const [bgno, setbgno] = useState(0);
  const [bg, setbg] = useState("body0");

  const send = async (bgno) => {
    console.log("Sending data to API:", bgno);
    try {
      const responseForSignup = await axios.post(
        "https://ezsell-backend.vercel.app/user/bg",
        { bgno },
        {
          withCredentials: true,
        }
      );
      console.log("Response from API:", responseForSignup.data);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Something went wrong, please try later.");
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    setaaa((prevMode1) => (prevMode1 === "aaa1" ? "aaa2" : "aaa1"));
  };

  const changebg = (a) => {
    if (a !== bgno) {
      setbgno(a);
      setbg(`body${a}`);
      send(a);
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const rep = await axios.post(
          "https://ezsell-backend.vercel.app/user",
          {},
          { withCredentials: true }
        );
        if (rep.data && rep.data.back !== undefined) {
          changebg(rep.data.back);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, aaa, changebg, bg }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
