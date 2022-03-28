import axios from 'axios';
import {useState, useEffect} from 'react';
export const LoginSignUp = () => {
  const [loginData, setLoginData] = useState({});
  const [signInData, setSignInData] = useState({
    interests : [],
    name : '', 
    location : '',
    password : '',
    image : ''
  });
  const handleLogin = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8080/users').then((res)=>{
      let user = res.data.filter((el)=>{
        if(el.name === loginData.name  && el.password ===  loginData.password) return true;
        else{
          return false;
        }
      })
      if(user.length === 1){
        localStorage.setItem('userLoginDetails', JSON.stringify(user[0]));
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleLoginChange = (e) => {
    const {id, value} = e.target;
    setLoginData({...loginData, [id] : value});
  }
  
  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/users', signInData);
  }
  const handleSignInChange = (e, interest) => {
    const {id, value} = e.target;
    
    if(interest !== undefined){
      console.log(id, value);
    setSignInData({...signInData, interests : [...signInData.interests,id]});
    }
    else {

      setSignInData({...signInData, [id] : value});
    }
  }
  return (
    <div className="loginSignUp">
      <form className="signUp" onSubmit={(e) => {handleSignIn(e) }}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          id="name"
          className="name"
          onChange={(e) => { handleSignInChange(e) }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          id="password"
          className="password"
          onChange={(e) => { handleSignInChange(e) }}
          required
        />
        <br />
        <select value={""} id='location' className="location" onChange={(e) => { handleSignInChange(e) }}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox"
          id="technology"
          className="technology"
          onChange={(e) => { handleSignInChange(e, 'interests') }}
        />
        <br />
        <label>food</label>
        <input type="checkbox" id="food" className="food" onChange={(e) => { handleSignInChange(e,'interests') }} />
        <br />
        <label>movies</label>
        <input type="checkbox" id='movies' className="movies" onChange={(e) => {handleSignInChange(e,'interests') }} />
        <br />
        <label>culture</label>
        <input type="checkbox" id="culture" className="culture" onChange={(e) => {handleSignInChange(e,'interests') }} />
        <br />
        <label>art</label>
        <input type="checkbox" id="art" className="art" onChange={(e) => {handleSignInChange(e,'interests') }} />
        <br />
        <label>drama</label>
        <input type="checkbox" id='drama' className="drama" onChange={(e) => {handleSignInChange(e,'interests') }} />
        <br />
        <label>image</label>
        <input
          type="text"
          id='image'
          className="image"
          onChange={(e) => {handleSignInChange(e) }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={(e)=> {handleLogin(e)}}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          id="name"
          onChange={(e) => { handleLoginChange(e)}}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          id="password"
          className="password"
          onChange={(e) => {handleLoginChange(e) }}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
