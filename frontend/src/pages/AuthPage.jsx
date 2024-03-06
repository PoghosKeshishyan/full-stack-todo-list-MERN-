import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios';

export function AuthPage() {
    const [user, setUser] = useState({
        email: 'poghos@mail.ru',
        password: '123456',
    });

    const navigate = useNavigate();

    const onChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post('api/auth/registration', user, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => alert(response.data.message))
            .then(() => navigate('/'))
            .catch(err => alert(err.response.data.message));                
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='AuthPage'>
            <h3>Registracia - auth</h3>

            <form onSubmit={submitHandler}>
                Email:
                <input 
                  type="text" 
                  value={user.email} 
                  name='email' 
                  onChange={onChangeInput} 
                /> <br /><br />

                Password:
                <input 
                  type="password" 
                  value={user.password} 
                  name="password" 
                  onChange={onChangeInput} 
                /> <br /><br />

                <input type="submit" value="Registracia" />
                <Link to="/login">Uje yest akkaunt ???</Link>
            </form>
        </div>
    )
}
