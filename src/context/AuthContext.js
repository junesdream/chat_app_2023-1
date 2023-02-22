import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

//Create Context API
export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		// Listen any realtime operation should be need reqcleaner function
		// Check if there is user
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			console.log(user);
		});

		return () => {
			unsub();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
