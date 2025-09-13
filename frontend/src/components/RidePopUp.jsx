import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={()=>{
          props.setRidePopupPanel(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold'>New Ride Available</h3>
        <div className='flex justify-between flex-col items-center gap-3'>
            {/* <img className='h-50 -mb-10 -mt-10' src="src/assets/cab.png" alt="car-logo" /> */}
            <div className='flex items-center justify-between bg-stone-200 rounded-xl p-3 mt-3 mb-3 w-full'>
              <div className='flex items-center'>
                  {/* <img src="" alt="" /> */}
                  <h2 className='text-2xl font-medium'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
              </div>
              <h5 className='text-xl font-medium'>2.5 KM away</h5>
            </div>
            <div className='w-full'>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-map-pin-range-line"></i>
                    <div>
                        <h3 className='text-xl font-medium'>Pick-up Location</h3>
                        <p className='text-gray-700 -mt-1'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-map-pin-4-fill"></i>
                    <div>
                        <h3 className='text-xl font-medium'>Destination Location</h3>
                        <p className='text-gray-700 -mt-1'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className='text-xl font-medium'>RS {props.ride?.fare}</h3>
                        <p className='text-gray-700 -mt-1'>Cash</p>
                    </div>
                </div>
            </div>
            <div className='flex w-full gap-3 items-center justify-between'>
                <button onClick={()=>{
                    props.setConfirmRidePopupPanel(true)
                    props.setRidePopupPanel(false)
                    props.confirmRide()
                }} className='bg-[#111] font-medium text-[#FFBD59] rounded-xl py-2 w-full text-lg'>Accept</button>
                <button onClick={()=>{
                    props.setRidePopupPanel(false)
                }} className='bg-stone-300 font-medium text-stone-900 rounded-xl py-2 w-full text-lg'>Ignore</button>
            </div>
        </div>
    </div>
  )
}

export default RidePopUp
