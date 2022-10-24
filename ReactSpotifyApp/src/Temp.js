import React from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = props => {    
    const {id} = useParams()

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }    

    // {props.options.map((item, idx) => <li key={idx + 1} va2lue={item.track.name}>{item.track.name} {item.track.artists[0].name}</li>)}

    return (
        <div>
            {props.songs.map((item, index) => {
                return (
                    <div>
                        <h1> Playlist - {id}</h1>
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