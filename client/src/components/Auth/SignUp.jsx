/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {
    // useEffect(() => {
    //     console.log(import.meta.env.VITE_APP_SERVER_URI)
    // })
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(true);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Passwords match, you can proceed with your logic here

            // Not Working
            // axios.post(`${process.env.REACT_APP_SERVER_URI}/register`, { name, email, password })

            axios.post(`${import.meta.env.VITE_APP_SERVER_URI}/register`, { name, email, password })
                .then(result => {
                    if (result.data === 'Already have an account') {
                        // alert("You already have a registered account")
                        toast.error('You already have a registered account!')
                        console.log(result)
                    } else {
                        // alert("Account registered")
                        toast.success('Account registered!')
                        console.log(result)
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err))

        } else {
            alert('Passwords Does\'nt match!');
            // Passwords do not match, show an error message or handle it accordingly
            setPasswordMatch(false);
        }
    }

    return (
        <div className="">
            <div className="pt-2">
                <h1 className="text-center">Registration Form</h1>

                <div className='container mt-5'>
                    <div className="row">
                        <div className=" mx-auto">

                            <div className="card card-body">

                                <form onSubmit={handleSubmit} >

                                    <div className="form-group  mt-3">
                                        <label className="d-flex flex-row align-items-center" htmlFor="name">Name</label>
                                        <input type="text" autoComplete='off' className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group  ">
                                        <label className="d-flex flex-row align-items-center" htmlFor="email">Email</label>
                                        <input type="email" autoComplete='off' className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group ">
                                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                                        <input type="password" autoComplete='off' className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group ">
                                        <label className="d-flex flex-row align-items-center" htmlFor="password">Confirm Password</label>
                                        <input type="password" autoComplete='off' className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>


                                    <div className="form-group pt-1">
                                        <button className="btn btn-primary btn-block" type="submit">Submit</button>
                                    </div>
                                </form>
                                <p className="small-xl pt-3 text-center">
                                    <span className="text-muted">Already a member?</span>
                                    <Link to="/login">Sign In</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp