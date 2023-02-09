import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useAuth } from '../../Context/AuthContext'

const initialState = { email: '', password: '' }
export default function Login() {
  const {dispatch} = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(initialState)


  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let { email, password } = state
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        // console.log(user);
        dispatch({type: 'LOGIN', payload: {user}})
        navigate('/dashboard')
        window.toastify('Logged in successfully.🎉', 'success')
      })
      .catch((error) => {
        // console.log(error)
        // console.log();
        window.toastify(`Failed to login.`, 'error')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='bg-custom-gradient'>
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-sm-10 col-md-8 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-2">Sign In</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="emailFI" placeholder="abc@xyz.com" name='email' onChange={handleChange} value={state.email} />
                        <label htmlFor="emailFI">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="passwordFI" placeholder="Enter your password" name='password' onChange={handleChange} value={state.password} />
                        <label htmlFor="passwordFI">Password</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      {!loading ?
                        <button className='btn btn-primary w-100'>Sign in</button>
                        : <button className='btn btn-primary w-100'>
                          <div className="spinner-grow"></div>
                        </button>
                      }
                    </div>
                  </div>
                  <div className="row mt-4 ">
                    <div className="col-8">
                      <Link to='/auth/register'>Don't have account?</Link>
                    </div>
                    <div className="col-4 ">
                      <Link to='/auth/forgetPasswords'>Forgot Password</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b76" fill-opacity="1" d="M0,128L40,149.3C80,171,160,213,240,202.7C320,192,400,128,480,117.3C560,107,640,149,720,186.7C800,224,880,256,960,266.7C1040,277,1120,267,1200,250.7C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg> */}
    </div>
  )
}


// import React, { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../../Context/AuthContext'
// export default function Register() {
//     const [loading, setLoading] = useState(false)
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const { signIn } = useAuth()
//     async function handleSubmit(e) {
//         e.preventDefault()
//         try {
//             setLoading(true)
//             await signIn(emailRef.current.value, passwordRef.current.value)
//             window.toastify('Logged in successfully', 'success')
//         } catch {
//             window.toastify('Failed to log in', 'error')
//         }
//         setLoading(false)
//     }
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-9 col-md-8 col-lg-6 mx-auto">
//                     <div className="card border-0 shadow rounded-3 my-5">
//                         <div className="card-body p-4 p-sm-5">
//                             <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row">
//                                     <div className="col-12">
//                                         <div className="form-floating mb-3">
//                                             <input type="email" className="form-control" id="emailFI" placeholder="abc@xyz.com" ref={emailRef} />
//                                             <label htmlFor="emailFI">Email</label>
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <div className="form-floating mb-3">
//                                             <input type="password" className="form-control" id="passwordFI" placeholder="Enter your password" ref={passwordRef} />
//                                             <label htmlFor="passwordFI">Password</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3 ">
//                                     <div className="col-6">
//                                         <Link to='/register'>Don't have account?</Link>
//                                     </div>
//                                     <div className="col-6 ">
//                                         <Link to='/forgetPass'>Forgot Password</Link>
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col">
//                                         {loading ?
//                                             <div className="spinner-grow text-primary offset-5" role="status">
//                                                 <span className="visually-hidden">Loading...</span>
//                                             </div>
//                                             :
//                                             <button className='btn btn-primary form-control' onClick={handleSubmit}>Sign In</button>}
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
