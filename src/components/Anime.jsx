import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Anime = () => {
    const [anime, setAnime] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        try{
            const getAnime = async () => {
                const response = await axios.get("http://localhost:8080/anime/all", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                setAnime(response.data);
            }

            getAnime();
        }
        catch(error){
            console.log(error);
        }

    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8080/anime/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            setAnime(anime.filter(item => item.id !== id));
        }
        catch(error){
            console.log(error);
        }
    }

    const handleLogout = async () => {
        console.log('Logged Out');
        try{
            await axios.post('http://localhost:8080/logout', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            localStorage.removeItem("token");

            navigator('/login');
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container my-5">
            <h1 className="mb-3">Anime Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {anime.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.genre}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/update/${item.id}`}
                                    className="btn btn-warning mx-2"
                                >
                                    Update
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <Link to="/add" className="btn btn-primary">
                    Add Anime
                </Link>
                <button className='mx-3 btn btn-primary' onClick={()=>handleLogout()}>LogOut</button>
            </div>
        </div>
    );
};

export default Anime;