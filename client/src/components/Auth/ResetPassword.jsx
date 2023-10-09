/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;


    const { id, token } = useParams();
    // console.log(useParams())

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post(`${import.meta.env.VITE_APP_SERVER_URI}/reset-password/${id}/${token}`, { password })
            .then(result => {
                if (result.data.status === 'Success') {
                    toast.success('Password Reset Successfully!')
                    navigate('/login');
                }
                else {
                    toast.error('Network Error!')
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="pt-5">
            <h1 className="text-center">Reset Password</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="card card-body">

                            <form onSubmit={handleSubmit} >
                                <div className="form-group  mt-3">
                                    <label className="d-flex flex-row align-items-center" htmlFor="email">Password</label>
                                    <input type="password" placeholder='Enter new Password' autoComplete='off' className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>


                                <br />
                                <div className="form-group ">
                                    <button className="btn btn-primary btn-block" type="submit">Update Password</button>
                                </div>
                            </form>
                            <p className="small-xl pt-3 text-center">
                                <Link to="/login">Dont Reset, Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ResetPassword