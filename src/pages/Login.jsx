 import React, { useState } from "react";
 import { useNavigate, Link } from "react-router-dom";
 import { signInWithEmailAndPassword } from "firebase/auth";
 import { auth } from "../firebase";

 const Login = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	//Funktion, useState von SUbmitevents fuer jede Submitinputs: Authentication  (Login - Register): React Firebase v9
	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			setErr(true);
		}
	};
		return (
			<div className="formContainer">
				<div className="formWarpper">
					<span className="logo">Rainbow Chat</span>
					<span className="title">Login</span>
					<form onSubmit={handleSubmit}>
						<input required type="email" placeholder="email" />
						<input type="password" placeholder="password" />
						<button>Sign In</button>
						{err && <span>Something went wrong</span>}
					</form>
					<p>You don't have an account? Register, please <Link to="/register">Register</Link></p>
				</div>
			</div>
		);
 };

 export default Login;  
