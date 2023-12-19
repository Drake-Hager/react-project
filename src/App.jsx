import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddCrew from './Components/addCrew.jsx';
import _ from 'lodash';
import Crewy from './Components/Crew.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

const [allCrew, setAllCrew] = useState(null);
const [searchResults, setSearchResults] = useState(null);
const [keywords, setKeywords] = useState("");
const [bountySearch, setBountySearch] = useState()

useEffect(() => {
  saveCrew(Crew)
}, []);
const saveCrew = (updatedCrew) => {
  setAllCrew(updatedCrew);
  setSearchResults(updatedCrew);
}

const searchCrew = () => {
  let updatedSearchResults = [...allCrew]
let keywordsArray = [];

if(keywords){
  keywordsArray = keywords.toLowerCase().split(' ');
}
let bountyFilter = []

if (bountySearch) {
switch (true){
    case (bountySearch === '0'):
      bountyFilter = updatedSearchResults.filter((Crew) => Crew.bounty < 300000000)
      break;
      case (bountySearch === '300000000'):
        bountyFilter = updatedSearchResults.filter((Crew) => Crew.bounty < 600000000)
      break;   
      case (bountySearch === '600000000'):
        bountyFilter = updatedSearchResults.filter((Crew) => Crew.bounty < 1000000000)
        break;
      case (bountySearch === '900000000'):
        bountyFilter = updatedSearchResults.filter((Crew) => Crew.bounty < 1200000000)
        break;
     case (bountySearch === '1200000000'):
        bountyFilter = updatedSearchResults.filter((Crew) => Crew.bounty > 1200000000)
     break;
}
  
}

if (keywordsArray.length > 0) {
  updatedSearchResults = updatedSearchResults.filter((Crew) =>
    keywordsArray.some(
      (word) =>
        Crew.name.toLowerCase().includes(word) ||
        Crew.rank.toLowerCase().includes(word)
    )
  );
}

if (bountyFilter.length > 0) {
  updatedSearchResults = _.intersectionBy(updatedSearchResults, bountyFilter, 'id');
}

setSearchResults(updatedSearchResults);
};


const removeCrew = (crewToDelete) => {
  /*console.table(crewToDelete)*/
  const updatedCrewArray = allCrew.filter(Crew => Crew.id !== crewToDelete.id);
  saveCrew(updatedCrewArray);
}
const editCrew = (updatedCrew) => {
/*console.table(updatedCrew)*/
const updatedCrewArray = allCrew.map(Crew => Crew.id === updatedCrew.id ? {...Crew, ...updatedCrew}: Crew)
saveCrew(updatedCrewArray) 
} 

const Crew = [{
  id:nanoid(),
  name: "Strawhat Luffy",
  location:"East Blue",
  rank: "Captain",
  image: 'final-project/public/images/Strawhat-luffy.jpg',
  bounty: 1500000000
}, {
  id:nanoid(),
  name: "Roronoa Zoro",
  location: "Shell Island",
  rank: "Swordsman",
  image: '/images/Zoro.jpg',
  bounty: 1111000000
}, {
  id:nanoid(),
  name: "Sanji Vinsmoke",
  location: "Baratie ship",
  rank: "Chef",
  image: '/images/Sanji.jpg',
  bounty: 1032000000
}, {
  id:nanoid(), 
  name: "Nami Cat-burgler",
  location: "Orange Town",
  rank: "Navigator",
  image: '/images/Nami.jpg',
  bounty: 366000000
},  {
  id:nanoid(),
  name: "Tony-Tony Chopper",
  location: "Drum Island",
  rank: "Doctor",
  image: '/images/Chopper.jpg',
  bounty: 1000
},{
  id:nanoid(),
  name: "God Usopp",
  location: "Syrup Village",
  rank: "Sniper",
  image: '/images/Usopp.jpg',
  bounty: 500000000
}, {
  id:nanoid(),
  name: "Nico Robin",
  location: "Ohara (destroyed)",
 rank: "Archaeologist",
  image: '/images/Nico-robin.jpg',
  bounty: 930000000
}, {
  id:nanoid(),
  name: "Franky Flam",
  location: "Water 7",
  rank: "Shipwright",
  image: '/images/Franky.jpg',
  bounty: 394000000
}, {
  id:nanoid(),
  name: "Soul King Brook",
  location: "Thriller Bark",
  rank: "Musician",
  image: '/images/Brook.jpg',
  bounty: 383000000
}, {
  id:nanoid(),
  name: "Jinbe The Fishman",
  location: "Fishman Island",
  rank: "Helmsman",
  image: '/images/jinbe.jpg',
  bounty: 1100000000
}
];
const addCrew = (newCrew) => {
  const updatedCrew = [...allCrew, newCrew]
  setAllCrew(updatedCrew)
setSearchResults([...searchResults, newCrew])
  
};


  return (
    <>
    <div className='container' id='background'>
     
    <div className="row m-3" id='allCrew'>
    {searchResults &&  searchResults.map((Crew) =>
    (<div className='col-lg-4 col-12' key={Crew.id}>
   <Crewy Crew={Crew} removeCrew={removeCrew} editCrew={editCrew}/>
  </div>   ))} 
    </div></div>
     {/*{!allCrew && <button type='button' className='btn btn-lg btn-success' onClick={() => saveCrew(Crew)}>Save Crew</button>}*/}
     <AddCrew addCrew={addCrew}/> 
      <div className='row mt-4' id='search'>
        <div className='col-md-4'>
          <input type='text' className='form-control' placeholder='>Search by Name or Rank...' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
      
        <div className='col-md-4'>
          <select  name='bounty' onChange={evt => setBountySearch(evt.currentTarget.value)}value={bountySearch} className='form-select'>
            <option value='' name='bounty'>Select Bounty</option>
            <option value='0' name='bounty'>Under 300,000,000</option>
            <option value='300000000' name='bounty'>Under 600,000,000</option>
           <option value='600000000' name='bounty'>Under 1,000,000,000</option>
          <option value='900000000' name='bounty'>Under 1,200,000,000</option>
            <option value='1200000000' name='bounty'>Over 1,200,000,000</option>
          </select>
        </div>
        <div className='col-md-4'>
          
          <button type="button" className='btn btn-primary' onClick={searchCrew}>Search <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
        </div>
      </div>
      </>
   
  );

}
export default App
