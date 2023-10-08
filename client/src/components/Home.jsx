/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get(`${import.meta.env.VITE_APP_SERVER_URI}/home`)
            .then((result) => {
                console.log("Home Result Data", result.data);
                if (result.data !== "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div>Home</div>
    )
}

export default Home