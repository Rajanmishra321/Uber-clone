import React,{createContext,useEffect} from "react";
import {io} from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`,)

cons