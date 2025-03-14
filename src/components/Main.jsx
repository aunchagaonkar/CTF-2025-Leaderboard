import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ctf from "../assets/ctf.png";
import Submit from "./Submit";
import RotatingStars from "./RotatingStars";
import Container from "./Container";
import { useEffect, useState } from "react";
const Main = () => {
  const [flg, setFlg] = useState(false);
  useEffect(() => {}, [flg]);
  const handleClick = () => {
    setFlg(!flg);
  };
  return (
    <>
      <Canvas className="right" style={{ position: "absolute" }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <RotatingStars />
      </Canvas>
      {/* <Canvas className='r3f' style={{position: 'absolute',}}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Stars />
      </Canvas> */}
      <div className="main-header">
        <div className="header-container">
          <img src={ctf} alt="react" />
        </div>
        <div className="btn-container">
          <div
            className="toggle-border"
            style={{
              zIndex: 1100,
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <input id="one" type="checkbox" onChange={handleClick} />
            <label htmlFor="one">
              <div className="handle"></div>
            </label>  
          </div>
        </div>
      </div>
      {flg ? (
        <Container />
      ) : (
        <div className="wrapper">
          <div className="main">
            <Submit />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
