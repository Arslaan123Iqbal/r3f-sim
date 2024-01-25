import {
  Environment,
  OrbitControls,
  ContactShadows,
  useCursor,
} from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from 'three';
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./SocketManager";
export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [floor, setFloor] = useState(false);

  useCursor(floor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <ContactShadows blur={2} />

      <OrbitControls />

      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setFloor(true)}
        onPointerLeave={() => setFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character) => (
        <AnimatedWoman
          key={character.id}
          topColor={character.topColor}
          hairColor={character.hairColor}
          bottomColor={character.bottomColor}
          position={new THREE.Vector3(character.position[0],character.position[1],character.position[2])}
        />
      ))}
    </>
  );
};
