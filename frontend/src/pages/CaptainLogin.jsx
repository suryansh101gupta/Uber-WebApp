import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [captainData, setCaptainData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
            setCaptainData({
                email: email,
                password: password
            })
            setEmail('');
            setPassword('');
        }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
        <div>
            <Link to='/'>
                <img className='w-35 mb-3' src="src/assets/SAFAR-CAPTAIN.png" alt="logo"/>
            </Link>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <h3 className='text-xl mb-2 font-medium'>What's your e-mail?</h3>
            <input 
            value={email} 
            onChange={(e) => 
                setEmail(e.target.value)
            }
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base' 
            required type="email" 
            placeholder="Email" />

            <h3 className='text-xl mb-2 font-medium'>Enter your password</h3>
            <input 
            value={password} 
            onChange={(e) => 
                setPassword(e.target.value)
            }
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base' 
            required 
            type="password" 
            placeholder="Password" />

            <button className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-lg px-4 py-2 w-full text-lg' type="submit">Login</button>

            <p className='text-center font-medium'>Join a Fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
        </div>
        <div>
            <Link to='/login' className='flex items-center justify-center bg-[#FFBD59] font-medium text-[#111] mb-5 rounded-lg px-4 py-2 w-full text-lg'> Login as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
