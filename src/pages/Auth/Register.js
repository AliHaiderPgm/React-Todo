import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, firestore } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore/lite'
import { useAuth } from '../../Context/AuthContext'

const initialValue = { email: '', password: '', confirmPassword: '' }

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(initialValue)
  const { dispatch } = useAuth()

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    let { email, password, confirmPassword } = state
    if (password !== confirmPassword) {
      return window.toastify('Password do not match', 'error')
    }
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        // console.log(user);
        setDocument(user)
      })
      .catch((error) => {
        // console.error(error)
        window.toastify('Failed to create an account.', 'error')
        setLoading(false)
      })
    const setDocument = async (user) => {
      try {
        await setDoc(doc(firestore, "users", user.uid), {
          firstName: "",
          lastName: "",
          uid: user.uid
        });
        dispatch({ type: 'LOGIN',payload: {user} })
      }
      catch (err) {
        console.log(err);
      }
      window.toastify('Account created successfully.🎉', 'success')
      setLoading(false)
      console.log('User document created');
    }
  }
  return (
    <div className='bg-custom-gradient'>
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-2 ">Sign up</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="nameFI" placeholder="Enter your name" ref={nameRef} />
                        <label htmlFor="nameFI">Name</label>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="emailFI" placeholder="abc@xyz.com" name='email' value={state.value} onChange={handleChange} />
                        <label htmlFor="emailFI">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="passwordFI" placeholder="Enter your password" name='password' value={state.password} onChange={handleChange} />
                        <label htmlFor="passwordFI">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="confirmPasswordFI" placeholder="Confirm your password" name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                        <label htmlFor="confirmPasswordFI">Confirm Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {loading ?
                        <div className="spinner-grow text-primary offset-5" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button className='btn btn-primary form-control' onClick={handleSubmit}>Signup</button>}

                    </div>
                  </div>

                </form>
                <div className="row mt-4 text-center">
                  <div className="col">
                    <p>
                      Already have an account?
                      <Link to='/auth/login'>Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
