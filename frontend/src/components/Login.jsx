import { useState, useContext } from "react";
// import { AuthContext } from '../AuthContext';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// await login(email, password);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-blue-600 flex-col">
			<div>
				<svg
					className="w-24 h-24 text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="0.7"
						d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
					/>
				</svg>
			</div>
			<form onSubmit={handleSubmit} className="p-6 rounded w-1/3">
				<div className="relative mb-6">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
						<svg
							className="w-4 h-4 text-white "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 16">
							<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
							<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
						</svg>
					</div>
					<input
						id="input-group-1"
						className="bg-transparent border border-white text-white text-sm rounded-lg focus:ring-white focus:border-2 focus:border-white block w-full ps-10 p-2.5 placeholder:text-white"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="EMAIL"
						required
					/>
				</div>

				<div className="relative mb-6">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
						<svg
							className="w-4 h-4 text-white "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 16">
							<path d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" />
						</svg>
					</div>
					<input
						id="input-group-1"
						className="bg-transparent border border-white text-white text-sm rounded-lg focus:ring-white focus:border-2 focus:border-white block w-full ps-10 p-2.5 placeholder:text-white"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="PASSWORD"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-white text-blue-600 p-2 rounded text-base font-semibold">
					LOGIN
				</button>
			</form>
		</div>
	);
};

export default Login;
