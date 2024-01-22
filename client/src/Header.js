import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContextProvider'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:5000/api/user/getuser')
            .then((responce) => {
                console.log(responce)
                setUserInfo(responce.data)
            })
    }, [])

    const username = userInfo?.username;

    const logout=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/logout')
        .then((responce)=>{
            setUserInfo(null)
            navigate('/login')
        })
    }

    return (
        <div>
            <div className='container-fluid d-flex bg-secondary justify-content-between align-items-center p-2'>

                <Link to={'/'} className='text-decoration-none text-light p-3'><h4>Task-Manager</h4></Link>

                {username && (
                    <>
                        <h2 className='text-light p-3'>Welcome! {username} </h2>
                        <button className='btn text-light p-3' onClick={logout}><h5>Logout</h5></button>
                    </>
                )}

                {!username && (
                    <>

                        <Link to={'/login'} className='text-decoration-none  text-light p-3'>Login</Link>

                        <Link to={'/register'} className='text-decoration-none text-light p-3'>Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header