import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

function Crewy(props) {

const [editMode, setEditMode] =useState(false)
const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rank, setRank] = useState('');
  const [bounty, setBounty] = useState('')

  useEffect(() => {
    setName(props.Crew.name);
    setLocation(props.Crew.location);
    setBounty(props.Crew.bounty);
    setRank(props.Crew.rank)
  }, []);
  
  const savedCrew = () => {
    setEditMode(false)
    const updatedCrew = {name: name, rank: rank, location: location, bounty: bounty, id:props.Crew.id, image: props.Crew.image}
  props.editCrew(updatedCrew)
  }
  return (
    <>
    <div>
       <div className="card m-3">
        <br></br>
    <img className="card-img-top mx-auto p-3"  src={props.Crew.image}/>
    <div className="card-body">
    {!editMode && <ul className="list-group list-group-flush">
      <li className="list-group-item p-2">{props.Crew.name}</li>
      <li className='list-group-item p-2'>{props.Crew.rank}</li>
      <li className='list-group-item p-2'>{props.Crew.bounty.toLocaleString() + ' ' + "Berries"}</li>
      <li className='list-group-item p-2'>{"From: " + props.Crew.location}</li>
      <button type='button' className='btn btn-danger' onClick={() => props.removeCrew(props.Crew)}>Remove Crew Member <FontAwesomeIcon icon={faSkullCrossbones}></FontAwesomeIcon></button>
      <button type='button' className='btn btn-secondary'onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button> 
    </ul>
}
{editMode && <ul className="list-group list-group-flush">
      <li className="list-group-item p-2"><input type="text" className='form-control' value={name} onChange={(evt)=> setName(evt.currentTarget.value)}/></li>
      <li className='list-group-item p-2'><input type="text" className='form-control' value={rank} onChange={(evt)=> setRank(evt.currentTarget.value)}/></li>
      <li className='list-group-item p-2'><input type="text" className='form-control' value={bounty} onChange={(evt)=> setBounty(evt.currentTarget.value)}/></li>
      <li className='list-group-item p-2'><input type="text" className='form-control' value={location} onChange={(evt)=> setLocation(evt.currentTarget.value)}/></li>
   <button id='btnSave' className='btn btn-warning' onClick={savedCrew} >Save</button>
    </ul>}
  </div>
  </div>
    </div></>
  )
}

export default Crewy
