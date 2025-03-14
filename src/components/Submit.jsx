import { useState } from "react";
import axios from "axios";

const Submit = () => {
  const [userID, setUserID] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://ctf-tech-backend.onrender.com/check", {
        userID: userID,
        flag: flag,
      })
      .then(() => {
        setMsg("Correct Flag");
        setLoading(false);
        setFlag("");
      })
      .catch(() => {
        setMsg("Invalid Flag or invalid UserID");
        setLoading(false);
        setFlag("");
      });
  };

  const handlesUsername = (e) => {
    setUserID(e.target.value);
  };

  const handleFlag = (e) => {
    setFlag(e.target.value);
  };

  return (
    <>
      {/* Technozion Title - Updated with Hollow Font Effect */}
      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "4rem",
          textAlign: "center",
          marginTop: "2.5rem",
          marginBottom: "1.5rem",
          color: "#fff", // White text
          textTransform: "uppercase",
          letterSpacing: "4px",
          fontWeight: 900, // Extra bold for a strong space look
          textShadow: "0 0 5px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 25px rgba(255, 255, 255, 0.2)", // Soft white glow with low opacity
        }}        
      >
        Technozion
      </h1>

      {/* Adding extra div for spacing before the form */}
      <div style={{ marginBottom: "3rem" }}></div>

      {/* Moved the Ring div below */}
      <div className="ring" style={{ marginTop: "4rem" }}>
        <i style={{ "--clr": "#d900ff" }}></i>
        <i style={{ "--clr": "#1fbfdb" }}></i>
        <i style={{ "--clr": "#a60074" }}></i>

        <form action="submit" onSubmit={handleFormSubmit} className="login">
          <div className="login">
            <h2 style={{ textAlign: "center", marginBottom: "0.2rem" }}>
              Capture The Flag
            </h2>
            <div className="inputBx" onChange={handlesUsername}>
              <input type="text" placeholder="Enter CTF ID" />
            </div>
            <div className="inputBx">
              <input
                type="text"
                value={flag}
                placeholder="Enter Flag"
                onChange={handleFlag}
              />
            </div>
            <div className="inputBx">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <input type="submit" value="Submit Flag" />
                  <div className="msggg">{msg}</div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="mobile-button"></div>
    </>
  );
};

export default Submit;
