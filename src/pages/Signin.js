import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from './../components/Layout/Layout';
import {BsFillEyeFill} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import OAuth from '../components/Layout/OAuth';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const navigate = useNavigate();
  const loginHandler  = async (e) =>{
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      if(userCredentials.user){
        toast.success('Login Success');
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password")
    }
  }
  return (
    <Layout>
      <div className="container align-items-center justify-content-center mt-5 w-50">
        <h3 className='text-dark text-center'>Home <AiOutlineArrowRight/> Signin</h3>
        <form className='bg-light p-3' onSubmit={loginHandler}>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={onChange} name='email' aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={showPassword ? 'text':'password'} className="form-control mb-3" value={password} onChange={onChange} id="password" name='password' />
            <span>Show Password <BsFillEyeFill onClick={()=>{setShowPassword((prevState)=>!prevState)}} style={{cursor:"pointer"}} /></span>
            <span className='m-3'><Link to="/forgot-password">Forgot Password</Link></span>

          </div>

          <button type="submit" className="m-3 btn btn-dark">Sign In</button>
          <OAuth/>
          <div>
            <span className='m-3'>Not a User <Link to="/signup">Register Now!</Link></span>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default Signin