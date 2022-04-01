// User should be able to add/create new meetups 
import axios from 'axios';
import {useState, useEffect} from 'react'
export const AddMeetup = () => {
  const [meetup, setmeetup] = useState({
    title : '',
    location : '',
    data : '', 
    theme : '',
    description : '',
    image : '',
  });
  const handleMeeting = (el) =>{
    const {className, value} = el.target;
    console.log(className, value)
    setmeetup({...meetup, [className] : value})
  }
  const handleSubmit = (el) =>{
    el.preventDefault();
    axios.post('http://localhost:8080/meetups', meetup).then((response) =>{console.log(response);}).catch((err) =>{console.log(err.message)});
  }
  return (
    <div className="addMeetupContainer">
      <form onSubmit={(e)=> {handleSubmit(e)}}>
        <h1>Add Meetup</h1>
        <label>title</label>
        <input type="text" className="title" onChange={(e) => {handleMeeting(e) }} required />
        <label>Location</label>
        <select value={""} className="location" onChange={(e) => {handleMeeting(e) }}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>date</label>
        <input
          type="text"
          className="date"
          onChange={(e) => {handleMeeting(e) }}
          placeholder="format YYYY-MM-DD"
          required
        />
        <br />
        <label>time</label>
        <input
          type="text"
          className="time"
          onChange={(e) => {handleMeeting(e) }}
          placeholder="format HH:MM"
          required
        />
        <br />
        <label>Theme</label>
        <select value={""} className="theme" onChange={(e) => {handleMeeting(e) }}>
          <option value="">-----------</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="movies">Movies</option>
          <option value="culture">Culture</option>
          <option value="art">Art</option>
          <option value="drama">Drama</option>
        </select>
        <label>description</label>
        <input
          type="text"
          className="description"
          onChange={(e) => {handleMeeting(e) }}
          placeholder="Description"
          required
        />
        <br />
        <label>Image</label>
        <input
          type="text"
          className="image"
          onChange={(e) => {handleMeeting(e) }}
          required
        />
        <br />
        <input className="submitMeetupForm" type="submit" />
      </form>
    </div>
  );
};
