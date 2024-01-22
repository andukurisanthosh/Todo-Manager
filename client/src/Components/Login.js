import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from '../UserContextProvider';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext)
    axios.defaults.withCredentials=true

    const loginUser=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:5000/api/user/login', {email, password})
        .then((responce)=>{
            if(responce.status == 200){
               // console.log(responce)
               setUserInfo(responce.data)
               navigate('/dashboard')
            }
        })
    }
    return (
        <div className='container'>
            <h2 className='text-center text-secondary pt-5'>Login</h2>
            <form onSubmit={loginUser}>
                <div className='form-group p-2 m-5'>

                    <input
                        type='email'
                        placeholder='Email'
                        className='form-control  m-2'
                        name='email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                    ></input>
                    <input
                        type='password'
                        placeholder='Password'
                        className='form-control  m-2'
                        name='password'
                        onChange={(e)=>{setPassword(e.target.value)}}
                    ></input>
                    <button type='submit' className='btn btn-secondary m-2'>Login</button>
                    <p>
                        Don`t have an Account? <Link to="/register" className='text-decoration-none text-dark'><strong>Register</strong></Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login