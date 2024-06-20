import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from '../AuthContext';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    // const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('/api/users', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const handleEdit = async (id, updatedUser) => {
        await axios.put(`/api/users/${id}`, updatedUser, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        setUsers(users.map(user => (user._id === id ? updatedUser : user)));
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/users/${id}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        setUsers(users.filter(user => user._id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">User Management</h1>
            <table className="min-w-full bg-white rounded-md shadow-md">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user.firstName}</td>
                            <td className="py-2 px-4 border-b">{user.lastName}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => handleEdit(user._id, { firstName: 'NewFirstName', lastName: 'NewLastName', email: 'newemail@example.com' })} 
                                    className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                // onClick={logout} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default UserManagement;
