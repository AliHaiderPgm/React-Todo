import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { useAuth } from '../Context/AuthContext'
import Auth from './Auth'
import Dashboard from './dashboard'
import Frontend from './Frontend/index'

export default function Index() {
    const { isAuthenticated } = useAuth()
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<Frontend/>}/>
                    <Route  path='auth/*' element={!isAuthenticated ? <Auth/> : <Navigate to='/dashboard'/>}/>
                    <Route  path='dashboard/*' element={<PrivateRoute Component={Dashboard}/>}/>
                    <Route path='*' element={<h1>Page not found</h1>}/>
                </Routes>
        </BrowserRouter>
    )
}
