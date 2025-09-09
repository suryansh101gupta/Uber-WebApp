import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanelOpen, setPanelOpen, setPickup, setDestination, activeField }) => {

    // sample array for location
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
            // setPickupSuggestions([]);
        } else if (activeField === 'destination') {
            setDestination(suggestion);
            // setDestinationSuggestions([]);
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }


  return (
    <div>
      {
        suggestions.map( (elem, idx) => (
            <div key={idx} onClick={()=>{ handleSuggestionClick(elem)} } className='flex items-center my-3 border ml-5 mr-5 border-stone-100 active:border-black p-2 rounded-xl justify-start px-5'>
              <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
              <h4 className='px-2 font-medium'> {elem} </h4>
            </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
