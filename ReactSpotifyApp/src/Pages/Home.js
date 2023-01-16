import React from "react";
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Credentials } from '../Credentials';
import Playlist from "../components/Playlist";
import { Link } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";
import { Context } from "../store/appContext";
import { useContext } from "react";


const Home = () => {
    const spotify = Credentials();

  const [token, setToken] = useState('');
  const { store, actions } = useContext(Context);
  const [playlist, setPlaylist] = useState({setlectedPlaylist: '', listofSongsfromPlaylist: [], playlistImages: []});
  const [artistName, setArtistName] = useState({listofArtistNames: []})
  const [data,setData] = useState([{}])
  const [playlistsDB, setPlaylistDB] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get", {
        'method': 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => 
        setPlaylistDB(resp))
      .catch(error => console.log(error))
  
  }, [spotify.ClientId, spotify.ClientSecret])


  if (sessionStorage.getItem("token") && sessionStorage.getItem("username")) {
    return (
      <div clasName="">
        <div className="ml-5 pt-5">
          <h1 class="text-center pt-6 my-5 mb-4 text-8xl font-extrabold text-gray-900 dark:text-white md:text-8xl lg:text-9xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400">PUT </span> ME <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400"> ON</span></h1>
<p class="mb-2 text-center text-lg font-['Poppins'] text-black lg:text-xl">Share Your Favourite Spotify Playlists</p>
          <div className=" m-auto flex flex-cols-2 place-content-center">
          <Link to='/playlists'>
<button type="button" class="flex flex-col  text-gray-900 bg-blue-200 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mx-auto dark:bg-blue-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View Playlists here</button>
          </Link>
          <Link to='/add'>
          <button type="button" class="flex flex-col  text-gray-900 bg-blue-200 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mx-auto dark:bg-blue-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Your Own Playlists!</button>
          </Link>
          </div>
          </div>
      </div>
  )
  } else {
    return (
      <div clasName="">
        <div className="ml-5 pt-5">
          <h1 class="text-center pt-6 my-5 mb-4 text-8xl font-extrabold text-gray-900 dark:text-white md:text-8xl lg:text-9xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400">PUT </span> ME <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400"> ON</span></h1>
<p class="mb-2 text-center text-lg font-['Poppins'] text-black lg:text-xl">Share Your Favourite Spotify Playlists</p>
          <div className=" m-auto flex flex-cols-2 place-content-center">
          <Link to='/playlists'>
<button type="button" class="flex flex-col  text-gray-900 bg-blue-200 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mx-auto dark:bg-blue-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View Playlists</button>
          </Link>
          <Link to='/createAccount'>
          <button type="button" class="flex flex-col  text-gray-900 bg-blue-200 border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mx-auto dark:bg-blue-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Create an Account</button>
          </Link>
          </div>
          </div>
      </div>
  )
  }
    
}

export default Home