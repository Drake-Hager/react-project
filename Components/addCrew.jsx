import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './addCrew.css'



function AddCrew(props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rank, setRank] = useState('');
  const [bounty, setBounty] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
 
 
  const imageUpdate = (event) => {
  setSelectedFile(event.target.files[0]);
}
const doWork = () =>{
  const newCrew = {"id":nanoid(), "name":name, "rank":rank, "bounty":parseFloat(bounty), "location":location, "image":URL.createObjectURL(selectedFile)};
  console.log("New Crew Member:" , newCrew);
  props.addCrew(newCrew);
}


  return (
    <>
      <div className='row m-2 mt-5' id='addCrew'>
        <h3>Add Crew Member</h3>
        <div className='col-md-2'>
        <label htmlFor='txtFirstname' className='form-label'>Full Name</label>
        <input type='text' id='txtFirstName' placeholder='Full Name' className='form-control' onChange={(evt) => setName(evt.currentTarget.value)} value={name}/>
        </div>
        <div className='col-md-2'>
          <label htmlFor='rank' className='form-label'>Rank</label>
        <input type='text' id='rank' placeholder='Rank in Crew' className='form-control' onChange={(evt) => setRank(evt.currentTarget.value)} value={rank}/>
</div>
<div className='col-md-2'>
  <label htmlFor='bounty' className='form-label'>Bounty</label>
        <input type='text' id='bounty' placeholder='Bounty' className='form-control' onChange={(evt) => setBounty(evt.currentTarget.value)} value={bounty}/>
</div> 
<div className='col-md-2'>
        <label htmlFor='Location' className='form-label'>Place of origin</label>
        <input type='text' id='location' placeholder='Location of Meeting' className='form-control' onChange={(evt) => setLocation(evt.currentTarget.value)} value={location}/>
</div>
        <div className='col-md-2'><label htmlFor='formFileSm' className='form-label'>Crew Image</label>
        <input type='file' id='formFileSm' className='form-control form-control-sm'  name='formFileSm' placeholder='Image of member' onChange={imageUpdate}/>

</div>
<div className='col-md-2'>
  <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork} >Add Crew Member <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
</div>
      
    </div>
    </>
  )
}

export default AddCrew