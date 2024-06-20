import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";

function App() {

	return (
		<>
			<Router>
				<Routes>
        <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/add" element={<AddUser/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
