import React, { useContext } from "react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Credentials } from "../Credentials";
import Playlist from "../components/Playlist";
import { Link } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const UserAccount = () => {
  const spotify = Credentials();

  const { store, actions } = useContext(Context);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const user = store.username;
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    actions.viewPlaylists().then((resp) => setPlaylists(resp))
  })

  return (
    <div clasName="">
      <div className="m-auto">
        <h1 class="text-center pt-6 my-5 mb-4 text-8xl font-extrabold text-gray-900 dark:text-white md:text-8xl lg:text-9xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400">
            PUT{" "}
          </span>{" "}
          {user}{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-sky-400">
            {" "}
            ON
          </span>
        </h1>
        <p class="mb-2 text-center text-lg font-['Poppins'] text-black lg:text-xl">
          Uploaded Playlists
        </p>
        <div className=" m-auto  flex flex-col place-content-center">
          <button>{playlists}</button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
