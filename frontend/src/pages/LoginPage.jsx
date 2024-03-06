import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

export function LoginPage() {
    const [user, setUser] = useState({
        email: 'poghos@mail.ru',
        password: '123456',
    });

    const {login} = useContext(AuthContext);

    const onChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('api/auth/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                login(response.data.token, response.data.userId);

            })
            .catch(err => alert(err.response.data.message));                
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='LoginPage'>
            <h3>Avtorizacia - login</h3>

            <form onSubmit={submitHandler}>
                Email:
                <input 
                  type="text" 
                  value={user.email} 
                  name='email' 
                  onChange={onChangeInput} 
                /> <br /> <br />

                Password: 
                <input 
                  type="password" 
                  value={user.password} 
                  name="password" 
                  onChange={onChangeInput} 
                /> <br /> <br />

                <input type="submit" value="Voiti" />
                <Link to="/registration">Net akkaunta ???</Link>
            </form>
        </div>
    )
}
