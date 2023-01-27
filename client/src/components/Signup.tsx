import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import { signup } from '../api';

interface ErrorType {
    message: string
}


const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [errors, setErrors] = useState<Array<ErrorType>>([]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors([]);

        if (!(username && email && password && repeatedPassword)) {
            setErrors(prevErrors => ([
                ...prevErrors,
                {
                    message: 'Please fill all fields.'
                }
            ]))
        }

        if (password !== repeatedPassword) {
            return setErrors(prevErrors => ([
                ...prevErrors,
                {
                    message: 'Passwords do not match.'
                }
            ]))

        }

        if (!errors.length) {
            const response = await signup(JSON.stringify({
                username,
                email,
                password,
                repeatedPassword
            }));

            if (response.ok) {
                return navigate('/login');
            } else {
                const error = await response.json();
                return setErrors([error])
            }
        }
    }


    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <form className='p-5' onSubmit={handleSubmit}>
                {!!errors.length && (
                    <div className='error'>
                        {
                            errors.map(error => (
                                <p key={error.message}>{error.message}</p>
                            ))
                        }
                    </div>

                )
                }
                <h3 className='mb-3'>Sign Up</h3>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text"
                        className={!!errors.length && !username ? "form-control error" : "form-control"}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className={!!errors.length && !email ? "form-control error" : "form-control"}
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className={!!errors.length && !password ? "form-control error" : "form-control"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Repeated password</label>
                    <input
                        type="password"
                        className={!!errors.length && !repeatedPassword ? "form-control error" : "form-control"}
                        placeholder="Repeat password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}

                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3">
                        Sign Up
                    </button>
                </div>
                <p className='mt-3'>
                    Already registered? <a href="/login">sign in</a>
                </p>
            </form>

        </div >
    )
}

export default Signup;