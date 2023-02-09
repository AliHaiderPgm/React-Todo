import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Header'
import Footer from '../../components/Footer'
import Home from './Home'
import Todo from './Todo'

export default function index() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='/addTodo' element={<Todo/>}/>
                    </Route>
                </Routes>
            </main>
            <Footer />

        </>
    )
}
