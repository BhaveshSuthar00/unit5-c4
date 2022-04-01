// This is an event details page which has its own route
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Main } from '../Styled/Scomponents'
export const Event = () => {
  const {id} = useParams();
  const [valueHere, setValue] = useState(+id)
  const [stateAre , setState] = useState(null);
  const [userDataHere, setDataUser] = useState({});
  const [singleDd, setSingleDd] = useState({});
  const getSingleData = () =>{
    axios.get(`http://localhost:8080/meetups/${id}`).then((response) => {
      setSingleDd(response.data)
    }).catch((error) => {console.log(error);})
  }
  const getUser = () =>{
    let userData = JSON.parse(localStorage.getItem('userLoginDetails'));
    let current = userData.id;
    axios.get(`http://localhost:8080/users/${current}`).then((response) => {
      setDataUser(response.data);

        response.data.subscribed.map((el)=>{
          if(+el === +valueHere){
            setState(true);
          } 
          else setState(false);
        })

    })
  }
  useEffect(()=>{
    getSingleData();
    getUser();
  },[]);
  const handleSub = (value) => {
    let userData = JSON.parse(localStorage.getItem('userLoginDetails'));
    let current = userData[0].id;
      setDataUser({...userDataHere, subscribed :[...userDataHere.subscribed,value]});
      axios.patch(`http://localhost:8080/users/${current}`, userDataHere).then((response) => {
        setState(true);
      }).catch((err)=> console.log(err));
  }
  const handleUnshb = (value) =>{
    let userData = JSON.parse(localStorage.getItem('userLoginDetails'));
    let current = userData[0].id;
      let newsub = [];
      userDataHere.subscribed.map((el)=>{
        if(el !== value) newsub.push(el)
      })
      setDataUser({...userDataHere, subscribed : newsub});
      axios.patch(`http://localhost:8080/users/${current}`, userDataHere).then((response) => {
        setState(false);
      }).catch((err)=> console.log(err));
  }
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
      {stateAre===true ? 
        <button className="unsubscribe" onClick={() => {handleUnshb(valueHere)}}>Subscribe</button>
        :
        <button className="subscribe" onClick={() => {handleSub(valueHere)} }>unSubscribe</button>
      } 
    </div>
  );
};
