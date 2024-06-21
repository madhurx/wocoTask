import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
// import AuthProvider from '../AuthContext';

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/api/users`,
				{
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				},
			);
			setUsers(res.data);
		};
		fetchUsers();
	}, []);

	const handleEdit = (id) => {
		navigate(`/edit/${id}`);
	};

	const handleDelete = async (id) => {
		await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
			headers: {
				"x-auth-token": localStorage.getItem("token"),
			},
		});
		setUsers(users.filter((user) => user._id !== id));
	};

	const handleAdd = async () => {
		// Implement add functionality
	};

	return (
		<div className="min-h-screen flex flex-col  bg-gray-100 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
			<div>
				<button
					type="button"
					onClick={() => navigate("/add")}
					className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ">
					ADD NEW USER
				</button>
			</div>
			<div className="items-center">
				<table className="min-w-full bg-white rounded-md shadow-md">
					<thead>
						<tr>
							<th className="py-2 px-4 border-r">S.No</th>
							<th className="py-2 px-4 border-r">Full Name</th>
							<th className="py-2 px-4 border-r">Phone</th>
							<th className="py-2 px-4 border-r">Email</th>
							<th className="py-2 px-4 border-r">Created Date</th>
							<th className="py-2 px-4 border-r">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								key={user._id}
								className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
								<td className="py-2 px-4 border-r">{index + 1}</td>
								<td className="py-2 px-4 border-r">{`${user.firstName} ${user.lastName}`}</td>
								<td className="py-2 px-4 border-r">{user.phone}</td>
								<td className="py-2 px-4 border-r">{user.email}</td>
								<td className="py-2 px-4 border-r">
									{new Date(user.createdAt).toLocaleDateString()}
								</td>
								<td className="py-2 px-4 border-r">
									<button
										onClick={() => handleEdit(user._id)}
										className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
										Edit
									</button>
									<button
										onClick={() => handleDelete(user._id)}
										className="bg-red-500 text-white px-2 py-1 rounded mr-2">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					onClick={logout}
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
					Logout
				</button>
			</div>
		</div>
	);
};

export default Dashboard;
