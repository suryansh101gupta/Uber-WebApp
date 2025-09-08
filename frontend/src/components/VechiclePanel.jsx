import React from 'react'

const VechiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={()=>{
          props.setVehiclePanelOpen(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-4'>Choose a ride</h3>
        <div onClick={()=>{
            console.log("clicked")
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className='border border-transparent active:border-black w-full flex items-center justify-between p-1 rounded-xl mb-3 bg-stone-200'>
          <img className='ml-3 h-22' src="src/assets/cab.png" />
          <div className='ml-3 mr-10 max-w-[200px]'>
            <h4 className='font-medium text-base'>Safar Cab<span><i className="ri-user-3-fill px-2"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-xl font-semibold mr-2'>200rs</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className='border border-transparent active:border-black w-full flex items-center justify-between p-1 rounded-xl mb-3 bg-stone-200'>
          <img className='h-20' src="src/assets/auto-logo.png" />
          <div className='ml-3 mr-10 max-w-[200px]'>
            <h4 className='font-medium text-base'>Safar Cab<span><i className="ri-user-3-fill px-2"></i>3</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-xl font-semibold mr-2'>200rs</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className='border border-transparent active:border-black w-full flex items-center justify-between p-1 rounded-xl mb-3 bg-stone-200'>
          <img className='h-18 ml-2' src="src/assets/bike-taxi.png" />
          <div className='ml-3 mr-10 max-w-[200px]'>
            <h4 className='font-medium text-base'>Safar Cab<span><i className="ri-user-3-fill px-2"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-xl font-semibold mr-2'>200rs</h2>
        </div>
    </div>
  )
}

export default VechiclePanel
