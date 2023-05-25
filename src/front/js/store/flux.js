const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			newUser: { email:"", password:""},
			url: "http://127.0.0.1:3001",
			currentUser: null,

		},
		
		actions: {

			createNewUser: async (navigate) => {
				try {
					const { url, newUser } = getStore();
					const response = await fetch(`${url}/api/register`, {
						method: 'POST',
						body: JSON.stringify({ ...newUser }),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const data = await response.json()
					console.log(data)

					navigate('/acceso')

				} catch (error) {
					console.log(error);
				}
			},

			handleSubmitRegister: (e, navitgate) => {
				e.preventDefault();
				console.log(getStore());
				getActions().createNewUser(navitgate);
				
			},

			handleChangeUser(e){
				const { newUser } = getStore()
				e.preventDefault();
				newUser[e.target.name] = e.target.value
				setStore({ newUser })
				console.log(getStore().newUser[e.target.name])
			},

			comprobarLogin(navigate) {
				console.log(getStore().currentUser)
				if (getStore().currentUser !== null) {
					getActions().logout()
				}
					navigate('/acceso')
				
			},
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
