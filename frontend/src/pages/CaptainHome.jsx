import React, { useState, useRef } from 'react'; 
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import gsap from 'gsap'
import { useGSAP } from './useGSAP'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);

  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);


  useGSAP(function() {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    })
  }, [ridePopupPanel] )

  useGSAP(function() {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    })
  }, [confirmRidePopupPanel] )

  return (
    <div className='h-screen'>
      <div className='fixed top-7 left-7 flex items-center justify-between w-screen'>
        <img className='w-30 mr-2' src="src/assets/SAFAR.png" alt="logo" />
        <Link to='/captain-home' className='h-12 w-12 mr-15 bg-black flex items-center justify-center rounded-lg mt-1'>
            <i className="text-2xl text-[#FFBD59] font-medium ri-home-4-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="src/assets/map.jpg" alt="map" />
      </div>
      <div className='h-2/5 p-5'>
        <CaptainDetails />

            {/* <button 
            // onClick={()=>{
            //     props.setVehicleFound(true)
            //     props.setConfirmedRidePanel(false)
            //     props.setVehiclePanelOpen(false)
            // }} 
            className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-xl px-4 py-2 w-full text-lg'>Make Pyment <i className="ml-3 text-lg ri-money-rupee-circle-line"></i></button> */}
      </div> 
      <div ref={ridePopupPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed z-10 bottom-0 h-[75%] translate-y-full bg-white w-full px-3 py-8'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
