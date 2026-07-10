"use client";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { gameReducer, initialGameState, type GameState } from "./gameReducer";
type Value={state:GameState;ready:boolean;toggle:(id:string,f:boolean)=>void;markMixed:()=>void;reset:()=>void};
const Context=createContext<Value|null>(null);
export function GameProvider({children}:{children:React.ReactNode}){const[state,dispatch]=useReducer(gameReducer,initialGameState);const[ready,setReady]=useState(false);useEffect(()=>{queueMicrotask(()=>{try{const saved=JSON.parse(sessionStorage.getItem("brongo-mix")||"null");if(saved&&Array.isArray(saved.selectedIds))dispatch({type:"hydrate",state:{selectedIds:saved.selectedIds.filter((id:unknown)=>typeof id==="string"),hasMixed:Boolean(saved.hasMixed)}})}catch{sessionStorage.removeItem("brongo-mix")}setReady(true)})},[]);useEffect(()=>{if(ready)sessionStorage.setItem("brongo-mix",JSON.stringify(state))},[state,ready]);return <Context.Provider value={{state,ready,toggle:(id,f)=>dispatch({type:f?"selectFunctional":"toggle",id}),markMixed:()=>dispatch({type:"markMixed"}),reset:()=>dispatch({type:"reset"})}}>{children}</Context.Provider>}
export function useGame(){const value=useContext(Context);if(!value)throw new Error("GameProvider missing");return value}
