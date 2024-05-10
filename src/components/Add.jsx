import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Add = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleGenre = (e) => {
        setGenre(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:8080/anime/', {
                name,
                genre
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setName('');
            setGenre('');

            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-3">Add Anime</h1>
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
                            onChange={handleName}
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
                            onChange={handleGenre}
                        />
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-dark w-100 fw-bold"
                                    onClick={handleSubmit}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/anime" className="btn btn-success w-100 fw-bold">
                                    Go to Anime List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Add;