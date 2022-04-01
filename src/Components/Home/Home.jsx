import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Main } from '../Styled/Scomponents'
export const Home = () => {
  const [location, setLocation] = useState(null);
  const [loggedIn , setLogin] = useState(false);
  const [loginData , setLoginData] = useState({
    id : '',
  })
  const [meetups, setMeetups] = useState([]);
  const [subscribedData, setSubData] = useState([]);
  const userId = JSON.parse(localStorage.getItem('userLoginDetails')) || {};
  useEffect(()=>{
    setLoginData({})
    setLoginData({...userId});
  },[])
  const getData = () => {
    axios
      .get("http://localhost:8080/meetups")
      .then((res) => {
        setMeetups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    if(loginData.id > 0){
      setLogin(true);
    }
  },[])
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="homeContainer">
      {meetups
        .filter((el) => {
          if (location !== null) {
            if (el.location.toLowerCase() === location.toLowerCase())
              return true;
            else return false;
          } else if (location === "") return true;
          else return true;
        }) // Filter on the basis of Users interests and location (both true)
        .map((singleDd) => {
          return (
            <Link to={`/meetup/${singleDd.id}`} key={singleDd.id} className="events">
              <Main>
                <div>
                  <img src={singleDd.image} alt="" />
                </div>
                <div>
                  <p className="title">{singleDd.title}</p>
                  <p className="theme">{singleDd.theme}</p>
                  <p className="description">{singleDd.description}</p>
                  <p className="date">{singleDd.date}</p>
                  <p className="time">{singleDd.time}</p>
                  <p className="location">{singleDd.location}</p>
                </div>
              </Main>
            </Link>
          );
        })}
      <div className="subscribedData">
        <div>
          <select
            value={"null"} // add value here
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option value="null">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        {
          loggedIn ? 
          <Link to={`/addmeetup`}> Add Meetup</Link>
          : null
        }
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}

          {subscribedData.map((singleDd) => {
            return (
              <Link to={`/meetup/${singleDd.id}`} key={singleDd.id} className="events">
              <Main>
                <div>
                  <img src={singleDd.image} alt="" />
                </div>
                <div>
                  <p className="title">{singleDd.title}</p>
                  <p className="theme">{singleDd.theme}</p>
                  <p className="description">{singleDd.description}</p>
                  <p className="date">{singleDd.date}</p>
                  <p className="time">{singleDd.time}</p>
                  <p className="location">{singleDd.location}</p>
                </div>
              </Main>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
