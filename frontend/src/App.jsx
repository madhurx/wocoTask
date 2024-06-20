import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path="/login" element={<div>Hi</div>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
