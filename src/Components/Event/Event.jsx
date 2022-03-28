// This is an event details page which has its own route
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Main } from '../Styled/Scomponents'
export const Event = () => {
  const {id} = useParams();
  const [userDataHere, setDataUser] = useState({});
  const [singleDd, setSingleDd] = useState({
    subscribe : []
  });
  const getSingleData = () =>{
    axios.get(`http://localhost:8080/meetups/${id}`).then((response) => {
      setSingleDd(response.data)
    }).catch((error) => {console.log(error);})
  }
  const getUser = () =>{
    let userData = JSON.parse(localStorage.getItem('userLoginDetails'));
    let current = userData[0].id;
    console.log(current);
    axios.get(`http://localhost:8080/users/${current}`).then((response) => {
      setDataUser(response.data);
    })
  }
  useEffect(()=>{
    getSingleData();
    getUser();
  },[])
  return (
    <div className="eventContainer">
      <Main>
        <div>
          <img src={singleDd.image} alt="" />
        </div>
        <div>
          <p className='title'>{singleDd.title}</p>
          <p className='theme'>{singleDd.theme}</p>
          <p className='description'>{singleDd.description}</p>
          <p className='date'>{singleDd.date}</p>
          <p className='time'>{singleDd.time}</p>
          <p className='location'>{singleDd.location}</p>
        </div>
      </Main>
      {/* only one of the buttons should be visible depending on the status of subcription
      Hint : use conditional rendering */}
      <button className="unsubscribe">Unsubscribe</button>
      <button className="subscribe" onClick={() => {setDataUser({...userDataHere, subscribe : [...subscribe, id]}) }}>Subscribe</button>
    </div>
  );
};
