import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api';
import { useAuth } from '../hooks/useAuth';


interface ErrorType {
    message: string
}

const Login = () => {

    const { logIn } = useAuth();
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Array<ErrorType>>([]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setErrors([]);

        if (!(login && password)) {
            return setErrors([{
                message: 'Please fill all fields.'
            }])
        }

        if (!errors.length) {
            const response = await signin(JSON.stringify({
                login,
                password
            }));

            const result = await response.json();

            if (response.ok) {
                logIn(result.data);
            }

            setErrors([result]);
            setPassword('');
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
                <h3 className='mb-3'>Log In</h3>
                <div className="mb-3">
                    <label>Login</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3">
                        Log in
                    </button>
                </div>
                <p className='mt-3'>
                    Still unregistered? <a href="/signup">sign up</a>
                </p>
            </form>
        </div>
    )
}

export default Login