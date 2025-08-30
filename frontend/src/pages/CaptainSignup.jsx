import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [captainData, setCaptainData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
    
            setCaptainData({
                fullName:{
                    firstName: firstName,
                    lastName: lastName,
                },
                email: email,
                password: password
            })
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
            <div>
                <Link to='/'>
                    <img className='w-30 mb-5' src="src/assets/SAFAR-CAPTAIN.png" alt="logo"/>
                </Link>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-2xl mb-2 font-medium'>What's your Name</h3>
                <div className='flex gap-3 mb-7'>
                    <input 
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder: text-base' 
                        required type="text" 
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }} />
                    <input 
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder: text-base' 
                        required type="text" 
                        placeholder="Last Name"
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }} />
                </div>
                <h3 className='text-xl mb-2 font-medium'>What's your e-mail?</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base' 
                required type="email" 
                placeholder="Email"
                value={email} 
                onChange={(e) => 
                    setEmail(e.target.value)
                } />
    
                <h3 className='text-xl mb-2 font-medium'>Enter your password</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base' 
                required 
                type="password" 
                placeholder="Password"
                value={password} 
                onChange={(e) => 
                    setPassword(e.target.value)
                } />
    
                <button className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-lg px-4 py-2 w-full text-lg' type="submit">Signup</button>
    
                <p className='text-center font-medium'>Already a Captain? <Link to='/captain-login' className='text-blue-600'>Login with your Account</Link></p>
            </form>
            </div>
            <div>
                <p className='text-[15px] leading-tight'>
                    By proceeding, you consent to receive transactional and promotional emails from Safar. You can unsubscribe anytime.
                </p>
            </div>
        </div>
  )
}

export default CaptainSignup
