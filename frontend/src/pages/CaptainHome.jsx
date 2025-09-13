import React, { useState, useRef } from 'react'; 
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import gsap from 'gsap'
import { useGSAP } from './useGSAP'
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);

  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);
  const [ ride, setRide ] = useState(null);
  
  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
      socket.emit('join', {
          userId: captain._id,
          userType: 'captain'
      })
      const updateLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(position => {
                  socket.emit('update-location-captain', {
                      userId: captain._id,
                      location: {
                          ltd: position.coords.latitude,
                          lng: position.coords.longitude
                      }
                  })
              })
          }
      }
      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
      // return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', (data) => {
      console.log(data)
      setRide(data)
      setRidePopupPanel(true)
  })

  async function confirmRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
          rideId: ride._id,
          captainId: captain._id,
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
  }

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
        <LiveTracking />
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
        <RidePopUp 
          ride={ride}
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide} />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed z-10 bottom-0 h-[75%] translate-y-full bg-white w-full px-3 py-8'>
        <ConfirmRidePopUp 
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
          setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
