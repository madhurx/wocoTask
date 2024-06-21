import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Navbar from "./components/Navbar";

const PrivateRoute = () => {
	const { user, loading } = useContext(AuthContext);
	console.log("private", user, loading);

	if (loading) {
		return <div>Loading...</div>;
	}

	return user ? (
		!loading ? (
			<div>
				<Navbar />
				<Outlet />
			</div>
		) : (
			<Navigate to="/login" />
		)
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;
