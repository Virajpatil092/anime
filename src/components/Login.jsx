import React from 'react';
import { Link } from 'react-router-dom';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            const responce = await axios.post("http://localhost:8080/auth/login", {
                username, password
            })

            const token = responce.data.token;

            localStorage.setItem("token", token);

            navigate("/anime");

        }catch(e){
            console.log(e);
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Login Form</h2>
                    <div className="card my-5">

                        <form className="card-body cardbody-color p-lg-5">

                            <div className="text-center">
                                <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" id="Username" aria-describedby="emailHelp"
                                    placeholder="User Name" onChange={(e) => {
                                        setUsername(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" placeholder="password" onChange={(e)=>{
                                    setPassword(e.target.value);
                                }} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={handleSubmit}>Login</button>

                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                                Not Registered? 
                                <Link to="/register" className="text-decoration-none"> Register Here</Link>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;