import React from 'react'
import { useAuth } from '../Context/AuthContext'
import Login from '../pages/Auth/Login'

export default function PrivateRoute(props) {

    const { isAuthenticated } = useAuth()
    // console.log(user);
    const { Component } = props

    if (!isAuthenticated)
        return <Login />
    return (
        <Component />
    )
}
