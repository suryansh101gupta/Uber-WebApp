import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      {/* <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={()=>{
          props.setWaitingForDriver(false)
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold -mt-5'>Searching for a Ride</h3> */}
        
        <div className='flex items-center justify-between'>
          <img className='h-30 -mb-3 -mt-10 ' src="src/assets/cab.png" alt="car-logo" />
          <div className='mb-8 text-right'>
            <h2 className='font-medium  text-lg'>Captain Name</h2>
            <h4 className='font-semibold text-xl -mt-1 -mb-1'>MH04 VG 1234</h4>
            <p className='text-sm text-gray-600'>Cab Ride</p>
          </div>
        </div>

        <div className='flex justify-between flex-col items-center gap-3'>
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
            <button 
            // onClick={()=>{
            //     props.setVehicleFound(true)
            //     props.setConfirmedRidePanel(false)
            //     props.setVehiclePanelOpen(false)
            // }} 
            className='bg-[#111] font-medium text-[#FFBD59] mb-3 rounded-xl px-4 py-2 w-full text-lg'>Cancel Ride</button>
        </div>
    </div>
  )
}

export default WaitingForDriver
