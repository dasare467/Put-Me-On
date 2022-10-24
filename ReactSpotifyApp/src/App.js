import logo from './logo.svg';
import './App.css';
import { Credentials } from './Credentials';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Names from './PlaylistDetails';
import Playlist from './Playlist';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import PlaylistDetails from './PlaylistDetails';

const App = () => {

  const spotify = Credentials();

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState({setlectedPlaylist: '', listofSongsfromPlaylist: [], playlistImages: []});
  const [artistName, setArtistName] = useState({listofArtistNames: []})
  const [data,setData] = useState([{}])
  const [playlistsDB, setPlaylistDB] = useState([])

  useEffect(() => {
    console.log('hey big bro')

    // fetch("127.0.0.1:5000/members").then(
    //   res => res.json()
    // ).then(
    //     data => {
    //       setData(data)
    //       console.log(data)
    //     }
    // 
        }, [spotify.ClientId, spotify.ClientSecret]);



        return (
          <BrowserRouter>
          <Routes>
           <Route path ='/' element={<Home/>} />
           <Route path ='/playlists' element={<Playlist/>} />
           <Route path = '/playlists/:id/*' element={<PlaylistDetails />} />
          </Routes>
          </BrowserRouter>
        );
       }
  

export default App;
