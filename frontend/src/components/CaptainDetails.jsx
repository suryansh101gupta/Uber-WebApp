import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <h5 className='text-center w-[94%] absolute -mt-3' onClick={()=>{
          // props.setWaitingForDriver(false)
        }}><i className="text-3xl text-stone-600 ri-arrow-down-wide-fill"></i></h5>
        {/* <h3 className='text-2xl font-semibold -mt-5'>Searching for a Ride</h3> */}

        <div className='flex items-center justify-between p-5 mt-3'>
          <div className='flex items-center justify-start gap-2'>
            <img className='h-15 w-15 rounded-full object-cover' src="src/assets/cab.png" alt="logo" />
            <h4 className='text-xl font-medium'>Captain Name</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>490 Rs</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>  
        <div className='flex bg-stone-300 rounded-xl justify-between gap-5 items-start p-5 mt-6'>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>30 KM</h5>
            <p className='text-sm text-gray-600'>Total Distance</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-pages-line"></i>
            <h5 className='text-lg font-medium'>15</h5>
            <p className='text-sm text-gray-600'>Jobs Completed</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
