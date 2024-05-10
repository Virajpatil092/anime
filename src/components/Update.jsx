import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/anime/${id}`, {
                   headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setName(response.data.name);
                setGenre(response.data.genre);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/anime/${id}`, {
                name,
                genre
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response.data);

            navigate('/anime');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-3">Update Anime</h1>
            <form>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="genre"
                            name="genre"
                            required
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Link to="/anime" className="btn btn-warning w-100 fw-bold" onClick={handleUpdate}>
                                    Update
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Update;