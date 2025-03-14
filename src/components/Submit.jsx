import './Submit.css'
import { useState } from "react";
import axios from "axios";

const Submit = () => {
  const [userID, setUserID] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if fields are empty
    if (!userID.trim() || !flag.trim()) {
      setMsg("⚠️ Both fields are required!");
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);
    axios
      .post("https://backend.technozion.tech/check", {
        userID: userID,
        flag: flag,
      })
      .then(() => {
        setMsg("✅ Correct Flag!");
        setError(false); // Make it green only for correct flag
        setLoading(false);
        setFlag("");
        setUserID("");
      })
      .catch(() => {
        setMsg("❌ Invalid Flag or invalid UserID");
        setError(true); // Make it red when there's an error
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="title">Technozion</h1>

      <div style={{ marginBottom: "3rem" }}></div>

      <div className="ring" style={{ marginTop: "4rem" }}>
        <i style={{ "--clr": "#d900ff" }}></i>
        <i style={{ "--clr": "#1fbfdb" }}></i>
        <i style={{ "--clr": "#a60074" }}></i>

        <div className='end'>
          <h1>The Competition has Ended.</h1>
        </div>

        {/* <form onSubmit={handleFormSubmit} className="login">
          <div className="login">
            <h2 style={{ textAlign: "center", marginBottom: "0.2rem" }}>
              Capture The Flag
            </h2>
            <div className="inputBx">
              <input
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                placeholder="Enter CTF ID"
                className={error && !userID ? "error-input" : ""}
              />
            </div>
            <div className="inputBx">
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Enter Flag"
                className={error && !flag ? "error-input" : ""}
              />
            </div>
            {msg && <div className={`alert ${error ? "error" : "success"}`}>{msg}</div>}
            <div className="inputBx">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <input type="submit" value="Submit Flag" />
              )}
            </div>
          </div>
        </form> */}
      </div>

      <div className="mobile-button"></div>
    </>
  );
};

export default Submit;
