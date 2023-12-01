import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {
  Stats,
  OrbitControls,
  Sky,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { degToRad } from "three/src/math/MathUtils.js";
import { set } from "zod";
import { color } from "three/examples/jsm/nodes/Nodes.js";
const ViewBox = () => {
  const [boxSettings, setBoxSettings] = useState({
    width: 10,
    height: 20,
    thickness: 0.1,
    glueTab: 1.625,
    L: 5,
    W: 3,
    D: 4,
    autoRotate: true,
  });
  // useEffect(() => {
  //   console.log(boxSettings);
  // }, [boxSettings]);
  return (
    <div className="w-full h-screen">
      <p className="text-center">excuse any bugs, this is still in beta</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          formData.forEach((value, key) => {
            setBoxSettings((prev) => ({ ...prev, [key]: Number(value) }));
          });
          // Check for autoRotate
          setBoxSettings((prev) => ({
            ...prev,
            autoRotate: formData.get("autoRotate") === "on" ? true : false,
          }));
        }}
        className="flex flex-col gap-2 items-start h-1/6 absolute right-0 z-20 p-2"
      >
        <h1 className="text-center w-full">Box Settings</h1>
        <div className="flex justify-between w-full gap-2">
          <label htmlFor="thickness">Thickness</label>
          <input
            className="w-20"
            type="number"
            placeholder="Thickness"
            name="thickness"
            id="thickness"
            step={0.01}
            defaultValue={boxSettings.thickness}
          />
        </div>

        <div className="flex justify-between w-full">
          <label htmlFor="width">Width</label>
          <input
            className="w-20"
            type="number"
            name="width"
            id="width"
            defaultValue={boxSettings.width}
          />
        </div>
        <div className="flex justify-between w-full">
          <label htmlFor="height">Height</label>
          <input
            className="w-20"
            type="number"
            name="height"
            id="height"
            defaultValue={boxSettings.height}
          />
        </div>
        <div className="flex justify-between w-full">
          <label htmlFor="glueTab">Glue Tab</label>
          <input
            className="w-20"
            type="number"
            name="glueTab"
            id="glueTab"
            defaultValue={boxSettings.glueTab}
          />
        </div>
        <div className="">
          <label htmlFor="L">L:</label>
          <input
            className="w-10"
            type="number"
            name="L"
            id="L"
            defaultValue={boxSettings.L}
          />
          <label htmlFor="W">W:</label>
          <input
            className="w-10"
            type="number"
            name="W"
            id="W"
            defaultValue={boxSettings.W}
          />
          <label htmlFor="D">D:</label>
          <input
            className="w-10"
            type="number"
            name="D"
            id="D"
            defaultValue={boxSettings.D}
          />
        </div>
        <div className="flex justify-between w-full">
          <input type="submit" value="Set" className="btn btn-primary" />
          <div className="flex gap-2 items-center">
            <label htmlFor="autoRotate">Rotate</label>
            <input
              type="checkbox"
              name="autoRotate"
              id="autoRotate"
              defaultChecked={Boolean(boxSettings.autoRotate)}
            />
          </div>
        </div>
      </form>
      <Suspense fallback={null}>
        <Canvas>
          <OrbitControls autoRotate={boxSettings.autoRotate} />
          <Stats />
          {/* <Sky
            distance={45000}
            sunPosition={[0, 2, 1]}
            inclination={0.1}
            azimuth={1}
          /> */}
          <ambientLight intensity={0.4} />
          <AccumulativeShadows temporal frames={100} scale={10}>
            <RandomizedLight
              castShadow
              amount={12}
              frames={100}
              position={[5, 5, -10]}
            />
          </AccumulativeShadows>

          <Box boxSettings={boxSettings} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ViewBox;

type SquareProps = {
  size: { width: number; height: number };
  pos: { x: number; y: number; z: number };
  boxSettings: {
    width: number;
    height: number;
    thickness: number;
    glueTab: number;
  };
};
const Square = ({ size, pos, boxSettings }: SquareProps) => {
  const [colorMap, bumpMap, normalMap] = useLoader(TextureLoader, [
    "./textures/cardboard_texture.jpg",
    "./textures/cardboard_bump.jpg",
    "./textures/cardboard_normal.jpg",
  ]);
  colorMap.rotation = degToRad(90);
  bumpMap.rotation = degToRad(90);
  normalMap.rotation = degToRad(90);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  return (
    <mesh position={new THREE.Vector3(pos.y, pos.x, pos.z)}>
      <boxGeometry args={[size.width, size.height, boxSettings.thickness]} />
      <meshStandardMaterial
        // map={colorMap}
        // bumpMap={bumpMap}
        // normalScale={new THREE.Vector2(0.4, 0.2)}
        // normalMap={normalMap}
        color="white"
      />
    </mesh>
  );
};
const Box = ({
  boxSettings,
}: {
  boxSettings: {
    width: number;
    height: number;
    thickness: number;
    glueTab: number;
    L: number;
    W: number;
    D: number;
    autoRotate: boolean;
  };
}) => {
  const gap = 0.1;
  return (
    <group scale={0.25} rotation-z={degToRad(90)}>
      <mesh>
        {/* border */}
        <boxGeometry
          args={[boxSettings.width, boxSettings.height, boxSettings.thickness]}
        />
        <meshStandardMaterial color="red" wireframe wireframeLinewidth={20} />
      </mesh>
      <Square
        size={{
          width: boxSettings.D,
          height: boxSettings.height + boxSettings.glueTab,
        }}
        pos={{
          x: -1 * (boxSettings.glueTab / 2),
          y: 0,
          z: 0.01,
        }}
        boxSettings={boxSettings}
      />
      {/* Panel 1 */}
      <Square
        size={{
          width: boxSettings.width,
          height: boxSettings.L,
        }}
        pos={{
          x: boxSettings.height / 2 - boxSettings.L / 2,
          y: 0,
          z: 0,
        }}
        boxSettings={boxSettings}
      />
      {/* Panel 2 */}
      <Square
        size={{
          width: boxSettings.width,
          height: boxSettings.W,
        }}
        pos={{
          x: boxSettings.width / 4,
          y: 0,
          z: 0,
        }}
        boxSettings={boxSettings}
      />
      {/* Panel 3 */}
      <Square
        size={{
          width: boxSettings.width,
          height: boxSettings.L,
        }}
        pos={{
          x: -1 * (boxSettings.width / 4),
          y: 0,
          z: 0,
        }}
        boxSettings={boxSettings}
      />
      {/* Panel 4 */}
      <Square
        size={{
          width: boxSettings.width,
          height: boxSettings.W,
        }}
        pos={{
          x: -1 * (boxSettings.height / 2 - boxSettings.W / 2),
          y: 0,
          z: 0,
        }}
        boxSettings={boxSettings}
      />
    </group>
  );
};
