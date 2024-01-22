import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    axios.defaults.withCredentials=true

    const registerUser=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:5000/api/user/register', {username, email, password})
        .then((responce)=>{
            if(responce.status == 200){
                navigate('/login')
            }
        })
    }
    return (
        <div className='container'>
            <h2 className='text-center text-secondary pt-5'>Register</h2>
            <form onSubmit={registerUser}>
                <div className='form-group p-2 m-5'>
                    <input
                        type='text'
                        placeholder='Username'
                        className='form-control m-2'
                        name='username'
                        onChange={(e)=>{setUsername(e.target.value)}}
                    ></input>
                    <input
                        type='email'
                        placeholder='Email'
                        className='form-control m-2'
                        name='email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                    ></input>
                    <input
                        type='password'
                        placeholder='Password'
                        className='form-control m-2'
                        name='password'
                        onChange={(e)=>{setPassword(e.target.value)}}
                    ></input>
                    <button type='submit' className='btn btn-secondary m-2'>Register</button>
                    <p>
                        Already have an Account? <Link to="/login" className='text-decoration-none text-dark'><strong>Login</strong></Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default Register