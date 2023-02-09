import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { Link } from 'react-router-dom'

const initialState = {
  title: '',
  location: '',
  description: ''
}
export default function Todo() {
  const { user, isAuthenticated } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    let data = { ...state, [e.target.name]: e.target.value }
    setState(data)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let { title, location, description } = state
    title = title.trim()
    location = location.trim()
    description = description.trim()
    // console.log(state);
    // console.log(user);
    let form = { title, location, description }
    form.dateCreated = serverTimestamp()
    form.id = window.getRandomId()
    form.status = 'active'
    form.createdBy = {
      email: user.email,
      uid: user.uid
    }
    createDocument(form)
  }
  const createDocument = async (form) => {
    // console.log(form)
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "todos", form.id), form);
      window.toastify('Todo has been successfully added', 'success')
      setState(initialState)
    } catch (err) {
      console.error(err);
      window.toastify('Something went wrong', 'error')
    }
    setIsProcessing(false)

  }
  return (
    <>
      {!isAuthenticated
        ? <div className='container'>
          <div className="row align-items-center" style={{ minHeight: '80vh' }}>
            <div className="col">
              <div className="card bg-shadow p-5 text-center">
                <p className='mt-1'><Link to='/auth/login'>Sign in</Link> to add todos.</p>
              </div>
            </div>
          </div>
        </div>
        : <div className="container home">
          <div className="row">
            <div className="col">
              <div className="card p-sm-3 p-md-4 p-lg-5 text-center bg-shadow mt-5">
                <h1 className='mb-3'>Add Todos</h1>
                <form>
                  <div className="row mb-2">
                    <div className="col-sm-12 col-md-6 mb-2">
                      <input type="text" placeholder='Title' className='form-control' onChange={handleChange} name='title' value={state.title} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <input type="text" placeholder='Location' className='form-control' onChange={handleChange} name='location' value={state.location} />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <textarea rows="5" className='form-control' placeholder='Description' onChange={handleChange} name='description' value={state.description}></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button className='btn btn-outline-primary w-100' disabled={isProcessing} onClick={handleSubmit}>
                        {
                          isProcessing ?
                            <div className='spinner-grow spinner-grow-sm'></div>
                            : 'Add todo'
                        }
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}

    </>
  )
}
