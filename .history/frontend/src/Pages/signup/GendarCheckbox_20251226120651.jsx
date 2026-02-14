import React from 'react'

const GendarCheckbox = ({onCheckboxChange,selectedGender}) => {


  return (
    <div className='flex justify-center mt-5'>
<div className='mr-3'>
  <label>
    <span>Male</span>
  </label>
  <input type="checkbox" 
  
  className='checkbox border-slate-900'
  checked={selectedGender==="male"}
  onChange={()=>onCheckboxChange("male")}
  />
</div>
<div>

 <label>
    <span>female</span>
  </label>
  <input type="checkbox" />


</div>






    </div>
  )
}

export default GendarCheckbox