import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = () => {
	const { user, loading } = useContext(AuthContext);
	console.log("private", user, loading);

	if (loading) {
		return <div>Loading...</div>;
	}

	return user ? (
		!loading ? (
			<Outlet />
		) : (
			<Navigate to="/login" />
		)
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;
