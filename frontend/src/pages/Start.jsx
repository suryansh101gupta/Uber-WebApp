import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-[url(src/assets/bg4.png)] h-screen pt-8 w-full flex justify-between flex-col'>
      <img className='w-30 ml-7 mt-[-4px]' src="src/assets/SAFAR.png" alt="logo"/>
      <div className='bg-white py-5 px-5 pb-7 rounded-xl shadow-lg mx-5 mb-5'>
        <h2 className='text-3xl font-bold '>
          Get Started with SA
          <span className='text-3xl font-bold text-[#FFBD59]'>F</span>
          AR
        </h2>
        <Link to='/login' className='flex items-center justify-center w-full bg-black text-[#FFBD59] font-bold py-3 rounded-xl mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Start
