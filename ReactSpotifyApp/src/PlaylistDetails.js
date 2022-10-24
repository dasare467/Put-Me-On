import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Credentials } from './Credentials';
import { useParams } from 'react-router-dom';




const PlaylistDetails = props => { 
      const spotify = Credentials();
    
    const [token, setToken] = useState('');
    const [playlist, setPlaylist] = useState({setlectedPlaylist: '', listofSongsfromPlaylist: [], playlistName: '', playlistImages: []});
    const [artistName, setArtistName] = useState({listofArtistNames: []})
    const dwayne = "hi"
    const {id} = useParams()
    const {options} = useParams()
    const [playlistsDB, setPlaylistDB] = useState([])
    const [URL, setURL] = useState("")
    const [likes, setLikes] = useState();
    const index = parseInt(id) -1

    


    useEffect(() => {

        
    
    fetch("http://127.0.0.1:5000/get", {
        'method': 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
      .then(resp => resp.json())
      .then((resp) => {
           console.log(resp[index].playlist) 
           let URLInitial = resp[index].playlist
            let fixedURL = URLInitial.substring(34)
            let likesInitial = resp[index].likes
            setLikes(likesInitial)
            setURL(fixedURL)
      })
      .catch(error => console.log(error))
      
    
    axios('https://accounts.spotify.com/api/token', {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST',
        withCredentials : false
        })
        .then(tokenReponse => {
        setToken(tokenReponse.data.access_token)

        axios(`https://api.spotify.com/v1/playlists/${URL}` ,{
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenReponse.data.access_token,
                        'Content-Type': 'application/json'
                    },
            })
            .then (playlistResponse => {
            setPlaylist({
                setlectedPlaylist: "yo",
                playlistName: playlistResponse.data.name,
                listofSongsfromPlaylist: playlistResponse.data.tracks.items,
                playlistImages: playlistResponse.data.images[1].url

            })
            console.log(playlistResponse);
            console.log(playlistResponse.data.tracks.items)
            })
            })


        }, [URL, playlist.playlistImages])

        
        
        return (
            <div>
                <h1>Playlist - {playlist.playlistName}</h1>
                <img
                        src={playlist.playlistImages}>
                        </img>
                <p> Likes : {likes} </p>
                {playlist.listofSongsfromPlaylist.map((item, index) => {
                    return (
                        <div>
                            <p> {item.track.name}</p>
    
                            {item.track.artists.map((artist, index) => {
                                return(
                                    <div key={index}>
                                        <ul>
                                        <li> {artist.name} </li>
                                        </ul>
                                        
                                        </div>
                                );
                            })}
                        </div>
                    );
                })}    
            </div>
        );
    
}

export default PlaylistDetails;