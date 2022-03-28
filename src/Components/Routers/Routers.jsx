import { Routes, Route } from "react-router-dom";
import { AddMeetup } from "../AddMeetup/AddMeetup";
import { Event } from "../Event/Event";
import { Home } from "../Home/Home";
import { LoginSignUp } from "../LoginSignUp/LoginSignUp";
import { Navbar } from "../Navbar/Navbar";
import { NotFound } from "../NotFound/NotFound";

export const Routers = () => {
    return (<>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addmeetup" element={<AddMeetup />} />
            {/* <Route path="/event" element={<Event />} /> */}
            <Route path="/meetup/:id" element={<Event />} />
            <Route path="/loginsignup" element={<LoginSignUp />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </>);
}
            {/* meetup/:id create for detail page imp */}
            {/* meetup route should be dynamic */}