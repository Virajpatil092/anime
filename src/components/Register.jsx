import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                firstName,
                lastName,
                username,
                password,
                role
            });

            const token = response.data.token;

            localStorage.setItem("token", token);

            navigate("/anime");
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Register Form</h2>
                    <div className="card my-5">
                        <form className="card-body cardbody-color p-lg-5">
                            <div className="mb-3">
                                <input type="text" className="form-control" id="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="role" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={handleSubmit}>Register</button>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                Already Registered? <Link to="/login" className="text-decoration-none">Login Here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
