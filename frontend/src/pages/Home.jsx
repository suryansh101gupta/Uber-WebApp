import React, { use, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from './useGSAP'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VechiclePanel from '../components/VechiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from "axios";
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const confirmedRidePanelRef = useRef(null);

  const [vehicleFound, setVehicleFound] = useState(false); 
  const vehicleFoundRef = useRef(null);

  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return;
    socket.emit("join", { userType: "user", userId: user._id })
  }, [ user ])

  socket.on('ride-confirmed', ride => {
      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(ride)
  })

  socket.on('ride-started', ride => {
      console.log("ride")
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride } })
  })

  const handlePickupChange = async (e) => {
      setPickup(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setPickupSuggestions(response.data)
      } catch {
          // handle error
      }
  }

  const handleDestinationChange = async (e) => {
      setDestination(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setDestinationSuggestions(response.data)
      } catch {
          // handle error
      }
  }

  const submitHandler = (e) => {
      e.preventDefault()
  }

  useGSAP(function() {
    gsap.to(panelRef.current, {
      height: panelOpen ? '75%' : '0%',
    })
    gsap.to(panelCloseRef.current,{
      opacity: panelOpen ? 1 : 0,
    })
  }, [ panelOpen ])

  useGSAP(function() {
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanelOpen ? '0%' : '100%',
    })
  }, [vehiclePanelOpen] )

  useGSAP(function() {
    gsap.to(confirmedRidePanelRef.current, {
      y: confirmedRidePanel ? '0%' : '100%',
    })
  }, [confirmedRidePanel] )

  useGSAP(function() {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? '0' : '100%',
    })
  }, [waitingForDriver] )

  useGSAP(() => {
  gsap.to(vehicleFoundRef.current, {
    y: vehicleFound ? '0%' : '100%',
  });
  }, [vehicleFound]);

  async function findTrip() {
      setVehiclePanelOpen(true)
      setPanelOpen(false)

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickup, destination },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      console.log(response.data)
      setFare(response.data)
  }

  async function createRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
          pickup,
          destination,
          vehicleType
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      console.log(response.data)
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="src/assets/safar.png" alt="logo" />
      <div className='h-screen w-screen'>
          <LiveTracking />
      </div>
      {/* <div className='h-screen w-screen'> */}
        {/* temp img */}
        {/* <img className='w-full h-full object cover'src="src/assets/map.jpg"/> */}
      {/* </div> */}
    {/* </div> */}
      <div className='flex flex-col justify-end h-screen position absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false);
          }} className='absolute opacity-0 top-7 right-6 text-4xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold mt-2'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            {/* <div className="line absolute h-12 w-1 top-[33%] left-10 bg-gray-800 rounded-full"></div> */}
            <input 
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value = {pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-4' 
              type='text' 
              placeholder='Add a pick-up Location' 
            />
            <input 
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value = {destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-4' 
              type='text' 
              placeholder='Enter your destination' 
            />
          </form>
          <button onClick={findTrip} className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-xl px-4 py-2 w-full text-lg mt-5'>
            Find a Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 bg-white w-full px-3 py-8'>
        <VechiclePanel 
        setVehicleType={setVehicleType} 
        fare={fare} 
        setConfirmedRidePanel={setConfirmedRidePanel} 
        setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      <div ref={confirmedRidePanelRef} className='fixed z-10 bottom-0 bg-white w-full px-3 py-8'>
        <ConfirmedRide 
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmedRidePanel={setConfirmedRidePanel} 
          setVehiclePanelOpen={setVehiclePanelOpen} 
          setVehicleFound={setVehicleFound}/>
      </div>     
      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 bg-white w-full px-3 py-8'>
        <LookingForDriver 
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmedRidePanel={setConfirmedRidePanel} 
          setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 bg-white w-full px-3 py-8'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
