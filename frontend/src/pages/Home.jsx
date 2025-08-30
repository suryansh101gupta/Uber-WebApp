import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col bg-red-400'>
      <img className='w-30 ml-8' src="src/assets/SAFAR.png" alt="logo"/>
      <div className='bg-white py-5 px-5 pb-7'>
        <h2 className='text-3xl font-bold '>
          Get Started with SA
          <span className='text-3xl font-bold text-yellow-400'>F</span>
          AR
        </h2>
        <Link to='/login'className='flex items-center justify-center w-full bg-black text-yellow-300 font-bold py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Home
