import React from 'react'

const LocationSearchPanel = (props) => {

    // sample array for location
    const locations = [
        "SAMPLE LOCATION 1",
        "SAMPLE LOCATION 2",
        "SAMPLE LOCATION 3",
        "SAMPLE LOCATION 4",
    ]
  return (
    <div>
      {/* This is just sample data */}
      {
        locations.map(function (elem, idx) {
            return <div key={idx} onClick={()=>{
                props.setVehiclePanelOpen(true)
                props.setPanelOpen(false)
            }} className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
                      <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                      <h4 className='px-2 font-medium'> {elem} </h4>
                    </div>
        })
      }
      {/* <div className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
        <h4 className='px-2 font-medium'> SAMPLE LOCATION </h4>
      </div>
      <div className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
        <h4 className='px-2 font-medium'> SAMPLE LOCATION </h4>
      </div>
      <div className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
        <h4 className='px-2 font-medium'> SAMPLE LOCATION </h4>
      </div>
      <div className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
        <h4 className='px-2 font-medium'> SAMPLE LOCATION </h4>
      </div> */}
    </div>
  )
}

export default LocationSearchPanel
