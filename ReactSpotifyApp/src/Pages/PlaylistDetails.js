import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Credentials } from '../Credentials';
import { useParams } from 'react-router-dom';
import PlaylistHeader from '../components/PlaylistHeader';
import Tracks from './Tracks';
import { Link } from "react-router-dom";



const PlaylistDetails = props => { 
      const spotify = Credentials();
    
    const [playlist, setPlaylist] = useState({listofSongsfromPlaylist: []});
    const [playlistName, setPlaylistName] = useState('')
    const [imageURL, setImage] = useState('')
    const dwayne = "hi"
    const {id} = useParams()
    const {options} = useParams()
    const [playlistsDB, setPlaylistDB] = useState([])
    const [playlistURL, setPlaylistURL] = useState("")
    const [likes, setLikes] = useState();
    const index = parseInt(id) -1
    var count = 1;
    

    


    useEffect(() => {
    fetch(`http://127.0.0.1:5000/playlist/${id}`, {
        'method': 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
     .then(resp => resp.json()
      ).then((resp) => {
        console.log(resp)
        // setPlaylist ({
        //     listofSongsfromPlaylist: resp
        // })
      }
      )
      .catch(error => console.log(error))

    fetch(`http://127.0.0.1:5000/getImage/${id}`, {
        'method': 'GET',
        headers: {
            'Content-Type': 'applications/json'
          }
        })
        .then(resp => resp.json()
        )
        .then((resp) => 
            setImage(resp))
        .catch(err => console.log(err))

    fetch(`http://127.0.0.1:5000/getOriginalName/${id}`, {
        'method': 'GET',
        headers: {
            'Content-Type': 'applications/json'
          }
        })
        .then(resp => resp.json()
        )
        .then((resp) => 
            setPlaylistName(resp))
        .catch(err => console.log(err))

    fetch(`http://127.0.0.1:5000/getURL/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'applications/json'
      }
    }).then(resp => resp.json()
    ).then((resp) => {
      console.log(resp)
      // setPlaylist ({
      //     listofSongsfromPlaylist: resp
      // })
    }
    )
    
    // then( resp =>
    //   // resp => setPlaylistURL(resp)
    //   console.log(resp)
    //   )

    }, [pl_wanted])


    var artist = playlist.listofSongsfromPlaylist
    var pl_wanted = artist.artists
    var test = Object.values(artist)
    var trackNames = new Array()
    var artistNames = new Array()

    const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.post(`http://127.0.0.1:5000/delete/${id}`, {
        }).then(() => {
            alert("Deleted Successfully!");
        }
        ). catch(err => console.log(err))
    }



    
    

        return (
            <div className="min-h-screen content-center">   
            <div className='absolute  px-10 py-2 right-0.5'>
                <button onClick={handleSubmit} class="inline-flex items-center px-2 bg-blue-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class=" h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>
  </button>      
  </div> 
                <PlaylistHeader image={imageURL} name={playlistName}></PlaylistHeader>
                <div class="text-center">
                <a href={playlistURL}>
                  <button class=" m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
View Playlist On Spotify!</button>
                </a>
                    </div>
                <Tracks id={id}></Tracks>
                </div>

                  
                

                    // return (
                    //     <div>
                    //         <p>{item.track.name} </p>

                    //         {item.track.artists.map((artist, index) => {
                    //             return (
                    //                 <div key={index}>
                    //                     <ul>
                    //                         <li> {artist.name} </li>
                    //                     </ul>
                    //                     </div>
                    //             )
                    //         })}
                    //     </div>
                    // );
                   
            
        );
    }   
    

export default PlaylistDetails;