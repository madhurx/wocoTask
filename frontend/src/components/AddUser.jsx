import  { useState } from "react";

const AddUser = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	// const { register } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// await register({ firstName, lastName, email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center flex-col">
			<div className="font-semibold text-xl">ADD USER</div>

			<form onSubmit={handleSubmit} className="p-6 rounded w-1/3">
				<div className="flex space-x-3">
					<div className="relative mb-6">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
							<svg
								className="w-4 h-4 text-blue-400 "
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
							</svg>
						</div>
						<input
							id="input-group-1"
							className="bg-transparent border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-gray-600 focus:border-2 focus:border-gray-500 block w-full ps-10 p-2.5 placeholder:text-gray-500"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="FIRST NAME"
							required
						/>
					</div>

					<div className="relative mb-6">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
							<svg
								className="w-4 h-4 text-blue-400 "
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
							</svg>
						</div>
						<input
							id="input-group-1"
							className="bg-transparent border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-gray-600 focus:border-2 focus:border-gray-500 block w-full ps-10 p-2.5 placeholder:text-gray-500"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="LAST NAME"
							required
						/>
					</div>
				</div>

				<div className="relative mb-6">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
						<svg
							className="w-4 h-4 text-blue-400 "
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
						className="bg-transparent border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-gray-600 focus:border-2 focus:border-gray-500 block w-full ps-10 p-2.5 placeholder:text-gray-500"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="EMAIL"
						required
					/>
				</div>

				<div className="relative mb-6">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
						<svg
							className="w-4 h-4 text-blue-400 "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
						</svg>
					</div>
					<input
						id="input-group-1"
						className="bg-transparent border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-gray-600 focus:border-2 focus:border-gray-500 block w-full ps-10 p-2.5 placeholder:text-gray-500"
						type="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="PHONE"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full text-white bg-blue-600 p-2 rounded text-base font-semibold">
					SAVE
				</button>
			</form>
		</div>
	);
};
export default AddUser;
