import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from './useGSAP.js'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking.jsx'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const ride = location.state?.ride


  useGSAP(function() {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)',
    })
  }, [finishRidePanel] )


  return (
    <div className='h-screen'>
      <div className='fixed top-7 left-7 flex items-center justify-between w-screen'>
        <img className='w-30 mr-2' src="src/assets/SAFAR.png" alt="logo" />
        <Link to='/captain-home' className='h-10 w-10 mr-15 bg-black flex items-center justify-center rounded-lg mt-1'>
            <i className="text-xl text-[#FFBD59] font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <LiveTracking />
      </div>
      <div className='flex items-center justify-between h-1/5 p-5 bg-[#FFBD59]'>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button onClick={()=>{
            setFinishRidePanel(true)
        }} className='bg-[#111] font-medium text-[#FFBD59] rounded-xl py=x-10 p-3 w-[50%] text-lg'>Complete Ride</button>
      </div> 
      <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 h-[75%] translate-y-full bg-white w-full px-3 py-8'>
        <FinishRide
          ride={ride}
          setFinishRidePanel={setFinishRidePanel}  />
      </div>
      {/* <div className='h-screen fixed w-screen top-0 z-[-1]'>
        <LiveTracking />
      </div> */}
    </div>
  )
}

export default CaptainRiding
