import React, { use, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from './useGSAP'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VechiclePanel from '../components/VechiclePanel'

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
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
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
    })
  }, [vehiclePanelOpen] )

  return (
    <div className='bg-cover bg-[url(src/assets/map.jpg)] h-screen relative pt-8 w-full flex justify-between flex-col'>
    <div className='p-7 flex flex-col justify-between h-screen'>
      <Link to='/home'>
          <img className='w-30 mb-5' src="src/assets/SAFAR.png" alt="logo"/>
      </Link>
      {/* <div className='h-screen w-screen'> */}
        {/* temp img */}
        {/* <img className='w-full h-full object cover'src="src/assets/map.jpg"/> */}
      {/* </div> */}
    </div>
      <div className='flex flex-col justify-end h-screen position absolute top-0 w-full'>
        <div className='h-[25%] bg-white p-5 relative'>
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
                setPanelOpen(true)}
              }
              value = {pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className='bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-4' 
              type='text' 
              placeholder='Add a pick-up Location' 
            />
            <input 
              onClick={() => {
                setPanelOpen(true)}
              }
              value = {destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className='bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-4' 
              type='text' 
              placeholder='Enter your destination' 
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setVehiclePanelOpen={setVehiclePanelOpen} setPanelOpen={setPanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8'>
        <VechiclePanel setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
    </div>
  )
}

export default Home
