import { useNavigate } from "react-router-dom";

const IndexPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-screen">
			<div className="m-auto">
				<button
					type="button"
					className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					onClick={() => navigate("/login")}>
					Login
				</button>
				<button
					type="button"
					className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					onClick={() => navigate("/register")}>
					Register
				</button>
			</div>
		</div>
	);
};

export default IndexPage;
