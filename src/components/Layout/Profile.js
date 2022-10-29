import React, { useState } from 'react'
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';
import { FaEdit } from 'react-icons/fa'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import {doc, updateDoc} from 'firebase/firestore'

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetails, setChangeDetials] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData
    const handleLogout = () =>{
        auth.signOut();
        toast.success('Successfully Logout')
        navigate('/signin')
    }

    // onchange handler
    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }

    // submt handler
    const onSubmit = async() =>{
        try {
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName:name
                })
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {name});
                toast.success('User Updated');
            }
        } catch (error) {
            console.log(error);
            toast('Something Went Wrong')
        }
    }
  return (
    <Layout>
        <div className='container'>
            <div className="my-2 d-flex justify-content-between">
                <h4>Profile Detials</h4>
                <button className="btn btn-info" onClick={handleLogout}>Logout</button>
            </div>
            <div className="container w-50 card">
                <div className="mt-2 d-flex justify-content-between">
                    <p>User Personal details</p>
                    <span 
                        style={{ cursor: "pointer" }} 
                        onClick={ () => { 
                            changeDetails && onSubmit();
                            setChangeDetials((prevState => !prevState))
                            }
                        }>
                        {changeDetails ? <IoCheckmarkDoneCircle color='green'/> : <FaEdit color='red'/>}
                        {changeDetails ? "Save" : "Edit"}
                    </span>
                </div>
                <div className="card-body">
                <form>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={onChange} disabled={!changeDetails} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={onChange} disabled={!changeDetails} aria-describedby="emailHelp" />
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile
