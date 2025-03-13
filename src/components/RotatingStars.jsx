import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Stars } from "@react-three/drei";
const RotatingStars = () => {
  const rStars = useRef();
  useFrame(() => {
    // rStars.current.rotation.x += 0.001
    rStars.current.rotation.y += 0.0007;
  });
  return (
    <>
      <Stars count={1500} ref={rStars} />
    </>
  );
};

export default RotatingStars;
