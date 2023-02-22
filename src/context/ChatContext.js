//When we click on this user, we can see the chats between us and this user (this user Iinfos are stored on firebase). To do that we use Context API-> UserContext
import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

//Create Context API
export const ChatContextProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
	// Use useReducer; necause we need this userinformation and also combine to fetch this chat.

	//Use combinedId form firestore databse
	// Since this chatId depend on this user, it's better to use useRedeucer
	//Create INITIAL_STATE
	const INITIAL_STATE = {
		chatId: "null",
		user: {},
	};

	//Create reducer
	const chatReducer = (state, action) => {
		//We're gonna have only one action, it's CHANGE_USER. When we click the user, we're gonna change this user, at the same time, we're gonna update the chatId.
		switch (action.type) {
			case "CHANGE_USER":
				return {
					user: action.payload,
					chatId:
						currentUser.uid > action.payload.uid
							? currentUser.uid + action.payload.uid
							: action.payload.uid + currentUser.uid,
				};

			default:
				return state;
		}
	};

	 const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

		return (
			<ChatContext.Provider value={{ data: state, dispatch }}>
				{children}
			</ChatContext.Provider>
	);
};

 