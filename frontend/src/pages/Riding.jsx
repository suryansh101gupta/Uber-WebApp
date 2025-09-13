import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {

  const location = useLocation()
  const { ride } = location.state || {} // Retrieve ride data
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on("ride-ended", () => {
      navigate('/home')
  })

  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed h-15 w-15 bg-black flex items-center justify-center rounded-full right-5 top-5'>
            <i className="text-2xl text-[#FFBD59] font-medium ri-home-4-line"></i>
        </Link>
      <div className='h-3/5'>
        <LiveTracking />
      </div>
      <div className='h-1/2 p-5'>
        {/* <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={()=>{
          props.setWaitingForDriver(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold -mt-5'>Searching for a Ride</h3> */}

        <div className='flex items-center justify-between'>
          <img className='h-30 -mb-3 -mt-10 ' src="src/assets/cab.png" alt="car-logo" />
          <div className='mb-8 text-right'>
            <h2 className='font-medium  text-lg'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.firstname}</h2>
            <h4 className='font-semibold text-xl -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Cab Ride</p>
          </div>
        </div>

        <div className='flex justify-between flex-col items-center gap-3'>
            <div className='w-full'>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-map-pin-4-fill"></i>
                    <div>
                        <h3 className='text-xl font-medium'>Destination Location</h3>
                        <p className='text-gray-700 -mt-1'>{ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className='text-xl font-medium'>RS {ride?.fare}</h3>
                        <p className='text-gray-700 -mt-1'>Cash</p>
                    </div>
                </div>
            </div>
            <button 
            // onClick={()=>{
            //     props.setVehicleFound(true)
            //     props.setConfirmedRidePanel(false)
            //     props.setVehiclePanelOpen(false)
            // }} 
            className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-xl px-4 py-2 w-full text-lg'>Make Pyment <i className="ml-3 text-lg ri-money-rupee-circle-line"></i></button>
        </div> 
      </div> 
    </div>
  )
}

export default Riding
