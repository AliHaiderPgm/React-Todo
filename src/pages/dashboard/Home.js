import React from 'react'
import { Link } from 'react-router-dom'

export default function dashboard() {
  return (
    <div className='container'>
      <div className="row text-center">
        <div className="col">
          <h1>Dashboard</h1>
          <Link to='/' className='btn btn-primary'>Home Page</Link>
        </div>
      </div>
    </div>
  )
}
