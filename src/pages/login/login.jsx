import React, { useContext, useState } from 'react'
import { login } from '../../context/authContext/apicalls'
import { AuthContext } from '../../context/authContext/authContext'
// import { useHistory } from 'react-router-dom'
import './login.css'

const Login = () => {

    // const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        login({email, password}, dispatch)
        // history.push('/')
    }
    return (
        <div className='login'>
            <form action="" className="login-form">
                <input 
                type="email" 
                placeholder='email' 
                className="login-input" 
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder='password' 
                className="login-input" 
                onChange={(e)=> setPassword(e.target.value)}
                />  
                <button 
                className="login-button" 
                onClick={handleClick}
                disabled={isFetching}
                >Login</button>                  
            </form>
        </div>
    )
}

export default Login
