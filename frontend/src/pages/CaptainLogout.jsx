import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  axios.get(`{import.meta.env.VITE_BACKEND_URL}/captain/logout`, {
    header:{
        Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    if(res.status === 200){
      localStorage.removeItem('token');
      navigate('/captain-login');
    }
  })
  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
