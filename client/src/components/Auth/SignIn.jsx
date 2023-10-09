/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        // axios.post('http://localhost:3000/login', { email, password })

        axios.post(`${import.meta.env.VITE_APP_SERVER_URI}/login`, { email, password })
            .then(result => {
                console.log(result)
                if (result.data === 'User Not Found') {
                    // alert("Please Register your account")
                    toast.error('Please Register your account!')

                    // console.log(result)
                } else if (result.data === 'Password Incorrect') {
                    // alert("Password Incorrect")
                    toast.error('Password Incorrect!')
                    // console.log(result)
                } else {
                    // alert("Login Successful")
                    toast.success('Login Successful!')
                    navigate('/home');
                    // console.log(result)

                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="pt-5">
            <h1 className="text-center">Login</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="card card-body">

                            <form onSubmit={handleSubmit} >
                                <div className="form-group  mt-3">
                                    <label className="d-flex flex-row align-items-center" htmlFor="email">Email</label>
                                    <input type="email" autoComplete='off' className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group mt-2">
                                    <label className="d-flex flex-row align-items-center" htmlFor="password">Password
                                    </label>
                                    <input type="password" autoComplete='off' className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group mt-4 mb-4 ">
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="remember-me" name="remember-me" data-parsley-multiple="remember-me" />
                                        <label className="custom-control-label" htmlFor="remember-me">Remember me?</label>
                                    </div>
                                    <Link className="ml-auto border-link small-xl" to="/forget-password">Forget Password?</Link>
                                </div>


                                <div className="form-group ">
                                    <button className="btn btn-primary btn-block" type="submit">Log In</button>
                                </div>
                            </form>
                            <p className="small-xl pt-3 text-center">
                                <span className="text-muted">Not a member?</span>
                                <Link to="/register">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default SignIn