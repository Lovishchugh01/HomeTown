import React from 'react'
import Layout from '../components/Layout/Layout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success('Email Was Sent')
      navigate('/signin')

    } catch (error) {
      toast.error("Something Wet Wrong")
    }
  }
  return (
    <Layout>
        <div className="container">
          <h1 className='text-center mt-5'>Reset Your Password</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" aria-describedby="emailHelp" />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Reset</button>
              <Link to="/signin">Signin</Link> 
            </div>
          </form>
        </div>
        


    </Layout>
  )
}

export default ForgetPassword