import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import IndexPage from "./components/IndexPage";

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<IndexPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route element={<PrivateRoute />}>
							<Route path="/add" element={<AddUser />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/edit/:id" element={<AddUser />} />
						</Route>
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
