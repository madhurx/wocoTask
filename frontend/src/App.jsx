import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserManagement from "./components/UserManagement";
import AddUser from "./components/AddUser";

function App() {

	return (
		<>
			<Router>
				<Routes>
        <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/add" element={<AddUser/>} />
                   {/*  <Route path="/user-management" element={UserManagement} /> */}
				</Routes>
			</Router>
		</>
	);
}

export default App;
