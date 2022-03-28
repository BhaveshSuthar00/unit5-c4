import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";

export const Home = () => {
  const [meetups, setMeetups] = useState([]);
  const getData = () => {
    axios.get('http://localhost:8080/meetups').then((res)=>{
    console.log(res.data);  
    setMeetups(res.data);
    }).catch((err)=>{
      console.log(err);
      // window.location.href = '*';
    })
  }
  useEffect(()=>{
    getData();
  }, [])
  return (
    <div className="homeContainer">
      {
        meetups
        // .filter((el) => { }) // Filter on the basis of Users interests and location (both true)
        .map((el) => {
          return (
            <Link to={`/meetups/${el.id}`} key={el.id} className="events">
              <div className='title'>
                {el.title}
              </div>

              {/* add your children here (divs)
              ex : title, theme, description, date, time, location, image(optional)
              the classNames should be also : title, theme, description, date, time, location, image(optional)
             */}
            </Link>
          );
        })}

      <div className="subscribedData">
        <div>
          <select
            value={"add your value here"}  // add value here
            onChange={(e) => { }}
          >
            <option value="">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <Link to={`add your route here`}> Add Meetup</Link>
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}

          {[]
            .map((el) => {
              return (
                <Link to={`add route here`} className="events">
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                </Link>
              );
            })}

        </div>
      </div>
    </div>
  );
};
