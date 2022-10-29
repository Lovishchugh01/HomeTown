import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from './../components/Layout/Layout';
import {BsFillEyeFill} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db } from '../firebase.config';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { toast } from 'react-toastify';
import OAuth from '../components/Layout/OAuth';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name:"",
    password: "",

  });
  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const navigate = useNavigate();
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      updateProfile(auth.currentUser,{displayName:name})
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Signup Successfully")
      navigate('/')
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }
  return (
    <Layout>
      <div className="container align-items-center justify-content-center mt-5 w-50">
        <h3 className='text-dark text-center'>Home <AiOutlineArrowRight/> Signup</h3>
        <form className='bg-light p-3' onSubmit={onSubmitHandler}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={onChange} name='name' aria-describedby="nameHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={onChange} name='email' aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={showPassword ? 'text':'password'} className="form-control mb-3" value={password} onChange={onChange} id="password" name='password' />
            <span>Show Password <BsFillEyeFill onClick={()=>{setShowPassword((prevState)=>!prevState)}} style={{cursor:"pointer"}} /></span>
          </div>

          <button type="submit" className="m-3 btn btn-dark">Sign Up</button>
          <div>
            <h6 className='m-3'>Login With Google</h6>
            <OAuth/>
            <span className='m-3'>Already User <Link to="/signin">Login</Link></span>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default Signup