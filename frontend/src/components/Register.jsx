import  { useState, useContext } from 'react';
// import { AuthContext } from '../AuthContext';
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await register({ firstName, lastName, email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-1/3">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First Name" 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last Name" 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
