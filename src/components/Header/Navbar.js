import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../../config/firebase";
import { useAuth } from '../../Context/AuthContext'
export default function Navbar() {
    let navigate = useNavigate()
    const { isAuthenticated, dispatch } = useAuth()


    // const handleLogin = () => {
    //     dispatch({ type: 'LOGIN' })
    // }
    const handleLogout = () => {
        signOut(auth)
        .then(()=>{
            dispatch({ type: 'LOGOUT' })
            navigate('auth/login')
        })
        .catch(err=>{
            console.err(err)
        })
        window.toastify('Logged out.', 'success')
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link active" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/addTodo' className="nav-link" >Add Todo</Link>
                            </li>
                        </ul>
                        {
                            !isAuthenticated ? <Link to={'/auth/login'} className='btn btn-primary'>Login</Link>
                                : <>
                                    <Link to={'/dashboard'} className='btn btn-primary my-sm-2 my-md-0 mx-sm-0 mx-md-2'>Dashboard</Link>
                                    <Link className="btn btn-danger" onClick={handleLogout}>Logout</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}