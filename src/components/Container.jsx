import axios from "axios";
import { useEffect, useState } from "react";
import coin from "../assets/coins2.png";
import trophy from "../assets/trophy.png";

const Container = () => {
  const [user, setUser] = useState([]);
  // const [x, setX] = useState(30);
  const [rankMsg, setRankMsg] = useState("");
  const [rankSearch, setrankSearch] = useState("");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setX(x - 1);
  //   }, 1000);
  //   if (x === 0) {
  //     setX(30);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [x]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:9563/getLeaderboard")
        .then((res) => res.json())
        .then((data) => {
          const sortedUsers = data.sort((a, b) => {
            if (a.score !== b.score) {
              return b.score - a.score;
            } else {
              return new Date(a.timeStamp) - new Date(b.timeStamp);
            }
          });
          const top10Users = sortedUsers.slice(0, 10);
          setUser(top10Users);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    if (rankSearch.trim() === "") {
      setRankMsg("Please enter a Meta ID.");
      return;
    }

    axios
      .get("http://localhost:9563/getLeaderboard")
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          } else {
            return new Date(a.timeStamp) - new Date(b.timeStamp);
          }
        });
        const userIndex = sortedUsers.findIndex(
          (user) => user.userID === rankSearch
        );
        if (userIndex !== -1) {
          const userRank = userIndex + 1;
          setRankMsg(`Your rank is ${userRank}! ⚡`);
        } else {
          setRankMsg(`CTF ID '${rankSearch}' not found.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRankMsg("Error fetching data. Please try again later.");
      });
  };

  return (
    <div className="Leaderb">
      <div className="search">
        <div className="search-title">Check Your Rank!!</div>
        <div id="input-login" className="inputMain">
          <input
            className="searchInput"
            type="text"
            placeholder="Enter CTF ID"
            name="rankSearch"
            value={rankSearch}
            onChange={(e) => {
              setrankSearch(e.target.value);
            }}
          />
          <button id="leadbtn" onClick={handleSearch} className="searchBtn">
            <div className="search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="searchIcon"
                viewBox="0 0 48 48"
                id="search"
              >
                <path
                  d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="msg">
          <p>{rankMsg}</p>
        </div>
      </div>
      <div className="rank">
        <h1>
          <img src={trophy} alt="trophy" className="trophy" /> Ranklist{" "}
          <img src={trophy} alt="trophy" className="trophy" />
        </h1>
        <table>
          <thead className="outer">
            <tr className="inner title">
              <th>Rank</th>
              <th>Player</th>
              <th className="points-title">Points </th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user.userID} className="inner player-rank">
                <td>{index + 1}</td>
                <td>{user.userID}</td>
                <td className="points">
                  {user.score}
                  <img src={coin} alt="coin" className="points-coin" />
                </td>
                <td>
                  {new Date(user.timeStamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="bottom">Fetching New Ranklist in {x} seconds</div> */}
      </div>
    </div>
  );
};

export default Container;
