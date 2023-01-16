import React, { useContext } from "react";
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Credentials } from '../Credentials';
import Playlist from "../components/Playlist";
import { Link } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";
import { Context } from "../store/appContext";
import { useNavigate, Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";



const Login = () => {
    const spotify = Credentials();

    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token")
    const user = store.username
    const navigate = useNavigate();

  


    const handleClick = (e) => {
      e.preventDefault();
      actions.login(username,password).then( () => {
        if (sessionStorage.getItem("token") && sessionStorage.getItem("token") !="" && sessionStorage.getItem("token") != undefined) {
          console.log("hi")
          return navigate("/")
      }
    }).catch(() => console.log("erro!!!"))

      

        
      }

  


    const happy = () => {
      console.log(user)
    }
      



    return (
        <div clasName="">
          <div className="m-auto">
            <h1 class="text-center pt-6 my-5 mb-4 text-8xl font-extrabold text-gray-900 dark:text-white md:text-8xl lg:text-9xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400">PUT </span> ME <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400"> ON</span></h1>
<p class="mb-2 text-center text-lg font-['Poppins'] text-black lg:text-xl">Share Your Favourite Spotify Playlists</p>
            <div className=" m-auto  flex flex-col place-content-center">
              <input onChange={(e) => setUsername(e.target.value)} type="text" class="rounded-4 shadow w-50 border-2 border-black  py-2 m-auto my-5 text-center" placeholder="Enter Email"/>
              <input onChange={(e) => setPassword(e.target.value)} type="password" class="rounded-4 shadow w-50 py-2  border-2 border-black  place-content-center m-auto text-center" placeholder="Enter Password" />
              <button onClick={handleClick} class="flex flex-col  mt-4 text-gray-900 bg-blue-200 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mx-auto dark:bg-blue-900 dark:text-white dark:border-white-600 dark:hover:bg-blue-400 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
              <button onClick={happy}>{store.username}</button>
            </div>
            </div>
        </div>
    )
}

export default Login