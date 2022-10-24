import React from "react";
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Credentials } from './Credentials';
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";


const Home = () => {
    const spotify = Credentials();

  const [token, setToken] = useState('');
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

    return (
        <div>
            {playlistsDB.map(playlist => {
              return (
                <div key = {playlist.id} options={playlist.playlist}>
                <Link to ={`/playlists/${playlist.id}`}>
                    <p>{playlist.name}</p>
                </Link>
                </div>
              )
             })}
        </div>
    )
}

export default Home