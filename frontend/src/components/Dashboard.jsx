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

	return (
		<div className="min-h-screen flex flex-col  bg-slate-100 p-4">
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
				<table className="min-w-full bg-white rounded-md shadow-md border-separate  border-spacing-x-4">
					<thead className="">
						<tr className="text-gray-500 text-sm text-left">
							<th className="py-2 px-4 border-r-2 border-b-2 border-slate-200">#</th>
							<th className="py-2 px-4 border-r-2 border-b-2 border-slate-200">Full Name</th>
							<th className="py-2 px-4 border-r-2 border-b-2 border-slate-200">Phone</th>
							<th className="py-2 px-4 border-r-2 border-b-2 border-slate-200">Email</th>
							<th className="py-2 px-4 border-r-2 border-b-2 border-slate-200">Created Date</th>
							<th className="py-2 px-4  border-b-2 border-slate-200"></th>
						</tr>
					</thead>
					<tbody className="font-normal text-sm">
						{users.map((user, index) => (
							<tr
								key={user._id}
								className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">{index + 1}</td>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">{`${user.firstName} ${user.lastName}`}</td>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">{user.phone}</td>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">{user.email}</td>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">
									{new Date(user.createdAt).toLocaleDateString()}
								</td>
								<td className="py-2 px-4 border-r-2 border-slate-200 border-b-2">
									<button
										onClick={() => handleEdit(user._id)}
										className=" px-2 py-1 rounded mr-2">
										<svg
											className="w-6 h-6 text-gray-800 "
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
												strokeWidth="2"
												d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
											/>
										</svg>
									</button>
									<button
										onClick={() => handleDelete(user._id)}
										className=" px-2 py-1 rounded mr-2">
										<svg
											className="w-6 h-6 text-gray-800 "
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
												strokeWidth="2"
												d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
											/>
										</svg>
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
