import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedUser = jwtDecode(token);
			setUser(decodedUser);
		}
	}, []);

	const register = async (userData) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/register`,
				userData,
			);
			const { token } = res.data;
			localStorage.setItem("token", token);
			const decodedUser = jwtDecode(token);
			setUser(decodedUser);
			navigate("/dashboard");
		} catch (err) {
			console.error(err.response.data);
		}
	};

	const login = async (email, password) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/login`,
				{ email, password },
			);
			const { token } = res.data;
			localStorage.setItem("token", token);
			const decodedUser = jwtDecode(token);
			setUser(decodedUser);
			navigate("/dashboard");
		} catch (err) {
			console.error(err.response.data);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
