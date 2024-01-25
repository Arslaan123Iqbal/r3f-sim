import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
export const socket = io("http://16.171.11.93:3001");

export const charactersAtom = atom([]);
const SocketManager = () => {

    const [_characters, setCharacters] = useAtom(charactersAtom);
  useEffect(() => {
    function onConnect() {
      console.log("Connetde to clinet");
    }

    function onDisconnect() {
      console.log("Disconnect to clinet");
    }

    function hello() {
      console.log("hello");
    }

    function onCharacters(value) {
      setCharacters(value);
    }

  

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    socket.on("hello", hello);

    socket.on("characters", onCharacters);

    return () => {
      socket.off("connect", onConnect);

      socket.off("disconnect", onDisconnect);

      socket.off("hello", hello);

      socket.off("characters", onCharacters);
    };
  }, []);
  return <div></div>;
};

export default SocketManager;
