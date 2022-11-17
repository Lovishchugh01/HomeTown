import React from 'react'
import Layout from './../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Layout/Slider';

const HomePage = () => {
  const navigate = useNavigate();
  const img1 = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
  const img2 = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80";
  return (
    <Layout>
        <div className="container my-5">
          <Slider/>
          <h2 className='text-center'>Categories</h2>
          <div className="row">
            <div className="img-container col-md-6">
              <img src={img1} alt="rent" height={"400px"} style={{width: '100%'}} />
              <button className="btn" onClick={()=>navigate('/category/rent')}>To Rent</button>
            </div>
            <div className="img-container col-md-6">
              <img src={img2} alt="rent" height={"400px"} style={{width: '100%'}} />
              <button className="btn" onClick={()=>navigate('/category/sale')}>To Sale</button>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage