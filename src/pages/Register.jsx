import React, { useState } from 'react';
import Datei from "../img/datei.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
const [err, setErr] = useState(false);
const navigate = useNavigate();

//Funktion, useState von SUbmitevents fuer jede Submitinputs: Authentication  (Login - Register): React Firebase v9
const handleSubmit = async (e) => {
	e.preventDefault();
	const displayName = e.target[0].value;
	const email = e.target[1].value;
	const password = e.target[2].value;
	const file = e.target[3].files[0];

	// Authification von Email, Password
	try {
		// Create res = user
		const res =  await createUserWithEmailAndPassword(auth, email, password);

		// Imagefiles speichen/upload / Create Unique image name
		const storageRef = ref(storage, displayName);

		await uploadBytesResumable(storageRef, file).then(() => {
			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			getDownloadURL(storageRef).then(async (downloadURL) => {
				try {
					//Update profile
					await updateProfile(res.user, {
						displayName,
						photoURL: downloadURL,
					});
					//create user on firestore
					await setDoc(doc(db, "users", res.user.uid), {
						uid: res.user.uid,
						displayName,
						email,
						photoURL: downloadURL,
					});

					//create empty user chats on firestore
					await setDoc(doc(db, "userChats", res.user.uid), {});
					navigate("/");
				} catch (err) {
					console.log(err);
					setErr(true);
				}
			});
		});
	 } catch (err) {
		setErr(true);
	 }	
};

//Upload Images

  return (
		<div className="formContainer">
			<div className="formWarpper">
				<span className="logo">Rainbow Chat</span>
				<span className="title">Register</span>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="display name" />
					<input required type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<input style={{ display: "none" }} type="file" id="file" />
					<label htmlFor="file">
						<img src={Datei} alt="" />
						<span>Add an Datei</span>
					</label>
					<button>Sing Up</button>
					{err && <span>Something went wrong</span>}
				</form>
				<p>
					Do you have an account? Pleae, Login
					<Link to="/register">Login</Link>
				</p>
			</div>
		</div>
  );
} 

export default Register  

/*
uploadTask.on(			
			(error) => {
				// Handle unsuccessful uploads
				setErr(true);
			},
			() => {
				// Handle successful uploads on complete, es wird zu donloadURL
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					//update  user
					await updateProfile(res.user,{
						displayName,
						photoURL: downloadURL,
					});
					await setDoc(doc(db, "users", res.user.uid), {
						uid: res.user.uid,
						displayName,
						email,
						photoURL: downloadURL,
					});

					await setDoc(doc(db, "userChats", res.user.uid), {
					});
					navigate("./");
				});
			}
		); */
