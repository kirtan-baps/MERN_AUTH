/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {


    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post(`${import.meta.env.VITE_APP_SERVER_URI}/forget-password`, { email })
            .then(result => {
                // console.log(result)
                if (result.data.status === 'Success') {
                    toast.success('Login Successful!')
                    // navigate('/home');
                }
                // else {
                //     toast.error('Please Register your account!')
                // }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="pt-5">
            <h1 className="text-center">Forget Password</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="card card-body">

                            <form onSubmit={handleSubmit} >
                                <div className="form-group  mt-3">
                                    <label className="d-flex flex-row align-items-center" htmlFor="email">Email</label>
                                    <input type="email" autoComplete='off' className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>


                                <br />
                                <div className="form-group ">
                                    <button className="btn btn-primary btn-block" type="submit">Send</button>
                                </div>
                            </form>
                            <p className="small-xl pt-3 text-center">
                                <span className="text-muted">Not a member?</span>
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ForgotPassword