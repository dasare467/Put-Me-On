import React, { useEffect, useState } from "react";
import axios from "axios";

const Tracks = props => {
    const [playlist, setPlaylist] = useState({listofSongsfromPlaylist: []});
    



useEffect(() => {
    fetch(`http://127.0.0.1:5000/playlist/${props.id}`, {
        'method': 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
     .then(resp => resp.json()
      ).then((resp) => {
        setPlaylist ({
            listofSongsfromPlaylist: resp
        })
      }
      )
      .catch(error => console.log(error))
},[])

var songs = playlist.listofSongsfromPlaylist.songs


console.log(songs)

var arr = new Array()

if (songs == null) {
    return (
        <div>  
                    <p className="font-['poppins'] font-bold">Loading.. </p>
                </div>
    )
} else {
    return (
        <div>  
            {songs.map((item,i) => {
                return (
                    <ul class="w-100 divide-y divide-gray-200 dark:divide-gray-700">
       <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
             <div class="flex-shrink-0">
             </div>
             <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                   
                </p>
                <p class="text-md font-['poppins'] font-semibold text-black-200">
                {item.track.name}
                </p>
             </div>
             <div class="inline-flex font-['poppins'] items-center text-base font-semibold text-gray-900 dark:text-black">
                {item.track.artists.map((artist,i) => {
                    if ( i + 1 == item.track.artists.length) {
                        return (
                            <div>
                                <p class="p-0.5">{artist.name}</p>
                        </div>
                        )
                    } else {
                        return (
                            <div>
                                <p class="p-0.5">{artist.name},</p>
                        </div>
                        )
                    }
                })}
             </div>
          </div>
       </li>
       </ul>
                )
            })}
            </div>
    )
}

return (
    <div>  
        {songs.map((item,i) => {
            return (
                <ul class="w-100 divide-y divide-gray-200 dark:divide-gray-700">
   <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
         <div class="flex-shrink-0">
         </div>
         <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               
            </p>
            <p class="text-md font-semibold text-black-200">
            {item.track.name}
            </p>
         </div>
         <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
            {item.track.artists.map((artist,i) => {
                if ( i + 1 == item.track.artists.length) {
                    return (
                        <div>
                            <p class="p-0.5">{artist.name}</p>
                    </div>
                    )
                } else {
                    return (
                        <div>
                            <p class="p-0.5">{artist.name},</p>
                    </div>
                    )
                }
            })}
         </div>
      </div>
   </li>
   </ul>
            )
        })}





   
   {/* <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
         <div class="flex-shrink-0">
            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Neil image"></img>
         </div>
         <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               Thomas Lean
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $2367
         </div>
      </div>
   </li>
   <li class="pt-3 pb-0 sm:pt-4">
      <div class="flex items-center space-x-4">
         <div class="flex-shrink-0">
            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Neil image"></img>
    </div>
         <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
               Lana Byrd
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $367
         </div>
      </div>
   </li>
</ul> */}

    </div>
)
}



export default Tracks;