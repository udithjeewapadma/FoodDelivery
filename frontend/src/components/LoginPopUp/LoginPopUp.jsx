import React, {  useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Login");
    const [data,setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let nweUrl = url;
        if(currentState==="Login"){
            nweUrl += "/api/user/login";
        }else{
            nweUrl += "/api/user/register";
        }

        const response = await axios.post(nweUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.data);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }

    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Full Name'  required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-conditions">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {currentState==="Login"
            ?<p>create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopUp