import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
      {/* <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={()=>{
          props.setConfirmRidePopupPanel(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5> */}
        <h3 className='text-2xl font-semibold -mt-3'>Finish this Ride</h3> 
        <div className='flex justify-between flex-col items-center gap-3'>
            {/* <img className='h-50 -mb-10 -mt-10' src="src/assets/cab.png" alt="car-logo" /> */}
            <div className='flex items-center justify-between bg-stone-200 rounded-xl p-3 mt-4 mb-4 w-full'>
              <div className='flex items-center'>
                  {/* <img src="" alt="" /> */}
                  <h2 className='text-2xl font-medium'>User Name</h2>
              </div>
              <h5 className='text-xl font-medium'>2.5 KM away</h5>
            </div>
            <div className='w-full'>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-map-pin-range-line"></i>
                    <div>
                        <h3 className='text-xl font-medium'>Sample Location 1234</h3>
                        <p className='text-gray-700 -mt-1'>Sample Paragraph</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-map-pin-4-fill"></i>
                    <div>
                        <h3 className='text-xl font-medium'>Destination Location 1234</h3>
                        <p className='text-gray-700 -mt-1'>Sample Paragraph</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-4 border-b-2 border-b-gray-300 border-t-2 border-t-gray-300 rounded-xl'>
                    <i className="ml-3 text-lg ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className='text-xl font-medium'>RS 200</h3>
                        <p className='text-gray-700 -mt-1'>Cash</p>
                    </div>
                </div>
            </div>
            <div className='mt-6 w-full'>
                <Link to='/captain-home' className='mt-5 flex justify-center bg-[#111] font-semibold text-[#FFBD59] rounded-xl p-3 text-lg'>Complete Ride</Link>
                <p className='w-full text-sm mt-4'>Click on finish ride button if the payment has been completed.</p>
            </div>
        </div>
    </div>
  )
}

export default FinishRide
