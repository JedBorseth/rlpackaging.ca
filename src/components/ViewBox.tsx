import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const ViewBox = () => {
  return (
    <div className="w-full h-screen">
      <p className="text-center">excuse any bugs, this is still in beta</p>
      <Canvas>
        <Box />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
};

export default ViewBox;

const Box = () => {
  return (
    <mesh scale={0.5} rotation-x={0.8}>
      <boxGeometry args={[5, 2, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};
