import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [captainData, setCaptainData] = useState({});

    const [colour, setColoUr] = useState('');
    const [plate, setPlate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const {captain, setCaptain} = React.useContext(CaptainDataContext);
    
    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            fullname:{
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle:{
                colour: colour,
                plate: plate,
                capacity: capacity,
                vehicleType: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);

        if(response.status === 201){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setColoUr('');
        setPlate('');
        setCapacity('');
        setVehicleType('');
    }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
            <div>
                <Link to='/'>
                    <img className='w-35 mb-5' src="src/assets/SAFAR-CAPTAIN.png" alt="logo"/>
                </Link>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-2xl mb-2 font-medium'>What's your Name</h3>
                <div className='flex gap-3 mb-7'>
                    <input 
                        className='bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-lg placeholder: text-base' 
                        required type="text" 
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }} />
                    <input 
                        className='bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-lg placeholder: text-base' 
                        required type="text" 
                        placeholder="Last Name"
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }} />
                </div>
                <h3 className='text-xl mb-2 font-medium'>What's your e-mail?</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder: text-base' 
                required type="email" 
                placeholder="Email"
                value={email} 
                onChange={(e) => 
                    setEmail(e.target.value)
                } />
    
                <h3 className='text-xl mb-2 font-medium'>Enter your password</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder: text-base' 
                required 
                type="password" 
                placeholder="Password"
                value={password} 
                onChange={(e) => 
                    setPassword(e.target.value)
                } />

                <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                <div className='flex gap-4 mb-7'>
                    <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Vehicle colour'
                    value={colour}
                    onChange={(e) => {
                        setColoUr(e.target.value)
                    }}
                    />
                    <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Vehicle Plate'
                    value={plate}
                    onChange={(e) => {
                        setPlate(e.target.value)
                    }}
                    />
                </div>
                <div className='flex gap-4 mb-7'>
                    {/* Capacity Field */}
                    <div className="flex flex-col w-1/2">
                        <input
                        required
                        className='bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        type="number"
                        placeholder='Vehicle Capacity'
                        value={capacity}
                        onChange={(e) => {
                            let value = parseInt(e.target.value, 10);

                            if (vehicleType === "car") {
                            if (value < 4) value = 4; // enforce min 4
                            setCapacity(value);
                            } else if (vehicleType === "auto") {
                            setCapacity(3); // fixed
                            } else if (vehicleType === "bike") {
                            setCapacity(1); // fixed
                            }
                        }}
                        disabled={vehicleType !== "car"} // allow manual input only for car
                        />

                        {/* Validation messages */}
                        {vehicleType === "car" && (
                        <p className="text-sm text-gray-600 mt-1">
                            Capacity must be <strong>4 or more</strong> for cars.
                        </p>
                        )}
                        {vehicleType === "auto" && (
                        <p className="text-sm text-gray-600 mt-1">
                            Capacity is <strong>fixed at 3</strong> for autos.
                        </p>
                        )}
                        {vehicleType === "bike" && (
                        <p className="text-sm text-gray-600 mt-1">
                            Capacity is <strong>fixed at 1</strong> for bikes.
                        </p>
                        )}
                    </div>

                    {/* Vehicle Type Dropdown */}
                    <select
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        value={vehicleType}
                        onChange={(e) => {
                        setVehicleType(e.target.value);
                        // auto-set capacity based on type
                        if (e.target.value === "auto") setCapacity(3);
                        if (e.target.value === "bike") setCapacity(1);
                        if (e.target.value === "car") setCapacity(4); // default min for car
                        }}
                    >
                        <option value="" disabled>Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="bike">Bike</option>
                    </select>
                    </div>

    
                <button className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-xl px-4 py-2 w-full text-lg' type="submit">Signup</button>
    
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
