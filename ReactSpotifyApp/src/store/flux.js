import { data } from "jquery";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
 



const food = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MjU0Mzc3OSwianRpIjoiMDlhYzcyM2UtNGQ2Ny00NzJlLWE3NTAtZjQ5M2UzZDY0YjZkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNjcyNTQzNzc5LCJleHAiOjE2NzI1NDczNzl9.agWsrbEFqbdGUZfiZmVPbfcMabrcLvM02VMfANClOdQ"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "null",
			username: null,
			password: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const username = sessionStorage.getItem("username")
				const token = sessionStorage.getItem("token");
				// console.timeLog("App loaded, syncing session")
				// if (token && token!="" && token!=undefined) {
				// 	setStore({token: token})
				// }


				const store = getStore()


				setStore({
					username: username,
					token: token
				})
				
			},

            login: async (username,password) => {
                const opts = {
                    method: "POST",
					mode: 'cors',
					credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
						"Access-Control-Allow-Credentials" : "true"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                };

                try {
                    const resp = await fetch("http://127.0.0.1:5000/login", opts)
                    if (resp.status !== 200) {
                        alert("There has been some erorr!");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
					// setStore({
					// 	token: data.access_token,
					// 	username: username,
					// 	password: password
					// })

					// cookies.set('myCat', 'Pacman', { path: '/' });
					// console.log(cookies.get('access_token_cookie')); // Pacman
					// console.log(cookies.get('myCat')); // Pacman

					const hi = data.access_token

					
                    sessionStorage.setItem("username", username);



					setStore({
						token: data.access_token,
						username: username,
					})


					return true
                }
                catch (error) {
                    console.error("There has been an error while loggining")
                }

            },
			addPlaylist: async (playlist,name) => {

				const store = getStore();

				var Rtoken = store.token
				
                const opts = {
                    method: "POST",
					credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
						credentials: 'same-origin',
						"X-CSRF-TOKEN": `${sessionStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        playlist: playlist,
                        name: name
                    })
                };

                try {
                    const resp = await fetch("http://127.0.0.1:5000/add", opts)
                    if (resp.status !== 200) {
                        alert("There has been some erorr!");
                        return false;
                    }

                    const data = await resp.json();
					console.log(data)
					return true
                }
                catch (error) {
                    console.error("There has been an error while loggining")
                }

            },

			createAccount: async (username, password, confirmpassword, image) => {

				var password_check = true



				if (password !== confirmpassword) {
					alert("Passwords do not match!")
					password_check = false
				}

				if (image == null) {
					image = "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
				}


				const opts = {
                    method: "POST",
					mode: 'cors',
					credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
						"Access-Control-Allow-Credentials" : "true"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
						image: image
                    })
                };

				if (password_check) {
					try {
						const resp = await fetch("http://127.0.0.1:5000/createAccount", opts)
                    if (resp.status !== 200) {
                        alert("There has been some erorr!");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
					// setStore({
					// 	token: data.access_token,
					// 	username: username,
					// 	password: password
					// })

					// cookies.set('myCat', 'Pacman', { path: '/' });
					// console.log(cookies.get('access_token_cookie')); // Pacman
					// console.log(cookies.get('myCat')); // Pacman

					const hi = data.access_token

					
                    sessionStorage.setItem("username", username);
					return true
					} catch (error) {
						alert("There has been an error while creating account")
					}
				}
			},

			logout: async () => {
				
				const opts = {
                    method: "POST",
					mode: 'cors',
					credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
						"Access-Control-Allow-Credentials" : "true"
                    },

                };

				try {
                    const resp = await fetch("http://127.0.0.1:5000/logout", opts)
                    if (resp.status !== 200) {
                        alert("There has been some erorr!");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("this came from the backend", data);
					// setStore({
					// 	token: data.access_token,
					// 	username: username,
					// 	password: password
					// })

					// cookies.set('myCat', 'Pacman', { path: '/' });
					// console.log(cookies.get('access_token_cookie')); // Pacman
					// console.log(cookies.get('myCat')); // Pacman

					const hi = data.access_token

					
                    sessionStorage.removeItem("username");
					sessionStorage.removeItem("token");


					setStore({
						token: null,
						username: null,
					})
					return true
                }
                catch (error) {
                    console.error("There has been an error while loggining")
                }


			},

			viewPlaylists: async () => {
				const opts = {
                    method: "GET",
					mode: 'cors',
					credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
						"Access-Control-Allow-Credentials" : "true"
                    }
                };

				try {
                    const resp = await fetch("http://127.0.0.1:5000/getPlaylistsFromUser", opts)
                    if (resp.status !== 200) {
                        alert("There has been some erorr!");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("this came from the backend", data);
				
					const hi = data.access_token
					
                    return data
                }
                catch (error) {
                    console.error("There has been an error while loggining")
                }
			}
		}
	};
};

export default getState;