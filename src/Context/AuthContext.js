import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useReducer, createContext, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const initialState = { isAuthenticated: false }
const reducer = (state, actions) => {
  switch (actions.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: actions.payload.user }
    case 'LOGOUT':
      return { isAuthenticated: false }
    default:
      return state
  }
}
export function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('user is siggned in')
        dispatch({type: 'LOGIN', payload: {user}})
        // ...
      } else {
        // User is signed out
        console.log('user is siggned out')
        // ...
      }
    });
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}
















// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { auth } from '../../src/firebase'

// const AuthContext = createContext()

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthContextProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState()
//     const [loading, setLoading] = useState(true);

// // ******************* Sign UP ********************
//     function signUp(email, password) {
//         auth.createUserWithEmailAndPassword(email, password)
//         // .then(() => {
//             //     console.log('Sign up successful!');
//             //   })
//             //   .catch((error) => {
//                 //     console.error(error);
//                 //   });
//             }
// // ******************* Sign IN ********************
// function signIn(email,password){
//     auth.signInWithEmailAndPassword(email,password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log('logged in successfully');
//         console.log(userCredential);
//         console.log(user);
//         // ...
//       })
//       .catch((error) => {
//         // const errorCode = error.code;
//         // const errorMessage = error.message;
//         console.error(error)
//       });
// }
// // ******************* Get user data if sign in successful ********************
// // function getAuth(){
// //     auth.onAuthStateChanged(user => {
// //         if (user) {
// //           // User is signed in, see docs for a list of available properties
// //           // https://firebase.google.com/docs/reference/js/firebase.User
// //         //   const uid = user.uid;
// //           console.log(user);
// //           return user
// //           // ...
// //         } else {
// //           // User is signed out
// //           // ...
// //         }
// //       });
// // }
//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             setCurrentUser(user)
//             setLoading(false)
//         })
//         return unsubscribe
//     }, [])

//     const value = {
//         currentUser,
//         signUp,
//         signIn,
//     }
//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }
