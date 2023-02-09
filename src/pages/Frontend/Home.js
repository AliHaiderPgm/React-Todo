import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';


export default function Home() {
    const { user, isAuthenticated } = useAuth()
    const [document, setDocument] = useState([])
    const [todo, setTodo] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessingDelete, setIsProcessingDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    let array = []

    const fetchDocument = async () => {
        setIsLoading(true)
        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data()
            // console.log(data);
            array.push(data)
        });
        setDocument(array)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDocument()
    }, [user])

    const handleDelete = async (todo) => {
        console.log(todo)
        setIsProcessingDelete(true)
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            window.toastify('Todo deleted successfully.', 'success')
            let newDocument = document.filter((doc) => {
                return doc.id !== todo.id
            })
            setDocument(newDocument)
        } catch (err) {
            console.error(err)
            window.toastify('Something went wrong', 'error')
        }
        setIsProcessingDelete(false)
    }


    const handleUpdate = async () => {
        console.log(todo);
        let formData = { ...todo }
        formData.dateCreated = formData.dateCreated
        formData.dateModifed = serverTimestamp()
        formData.modifiedBy = {
            email: user.email,
            uid: user.uid
        }
        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            window.toastify('Todo has been successfully updated', 'success')
            let newDocument = document.map((doc) => {
                if (doc.id === todo.id)
                    return todo
                return doc
            })
            setDocument(newDocument)

        } catch (err) {
            console.error(err);
            window.toastify('Something went wrong.', 'error')
        }
        setIsProcessing(false)
    }
    const handleChange = (e) => {
        setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    return (
        <>
            {isAuthenticated
                ? <div className='container' >
                    <div className="row align-items-center text-center" style={{ minHeight: '80vh', }}>
                        <div className="col">
                            <h1 className='mb-3'>My Todos</h1>
                            {!isLoading
                                ? <div className="card bg-shadow p-3">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {document.map((todo, index) => {
                                                return <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{todo.title}</td>
                                                    <td>{todo.description}</td>
                                                    <td>{todo.location}</td>
                                                    <td>{todo.status}</td>
                                                    <td>
                                                        <button className='btn btn-info btn-sm mb-sm-1 mb-lg-0 me-sm-0 me-md-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setTodo(todo)}>
                                                            {!isProcessing
                                                                ? 'Edit'
                                                                : <div className='spinner-grow spinner-grow-sm '></div>
                                                            }
                                                        </button>
                                                        <button className='btn btn-danger btn-sm' disabled={isProcessingDelete} onClick={() => handleDelete(todo)}>
                                                            {!isProcessingDelete
                                                                ? 'Delete'
                                                                : <div className='spinner-grow spinner-grow-sm '></div>
                                                            }
                                                        </button>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                : <div className="container text-center bg-shadow p-5">
                                    <div className="row">
                                        <div className="col">
                                            <div className='spinner-grow spinner-lg'></div>
                                        </div>
                                    </div>

                                </div>}

                        </div>
                    </div>
                    <div className="modal fade" id="exampleModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Todo</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-6 mb-2">
                                            <input type="text" placeholder='Title' className='form-control' onChange={handleChange} name='title' value={todo.title} />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <input type="text" placeholder='Location' className='form-control' onChange={handleChange} name='location' value={todo.location} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <textarea rows="5" className='form-control' placeholder='Description' onChange={handleChange} name='description' value={todo.description}></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <select name="status" value={todo.status} className='form-control' onChange={handleChange}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className='container'>
                    <div className="row align-items-center" style={{minHeight: '80vh'}}>
                        <div className="col">
                            <div className="card bg-shadow p-5 text-center">
                                <p className='mt-1'><Link to='/auth/login'>Sign in</Link> to view todos.</p>
                            </div>
                        </div>
                    </div>
                </div>}

        </>
    )
}
