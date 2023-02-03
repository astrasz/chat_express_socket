import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select, { Options } from 'react-select';
import { SingleValue } from 'react-select/dist/declarations/src';
import { signup } from '../api';

interface ErrorType {
    message: string
}

interface AvatarType {
    value: string,
    label: string,
    image: string
}


const Signup = () => {

    const navigate = useNavigate();
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null)
    const [avatarImage, setAvatarImage] = useState<string | null>(null)
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
                repeatedPassword,
                avatar: selectedAvatar?.image
            }));

            if (response.ok) {
                return navigate('/login');
            } else {
                const error = await response.json();
                return setErrors([error])
            }
        }
    }


    const changeAvatar = (avatar: SingleValue<AvatarType | null>) => {
        setSelectedAvatar(avatar);
    }

    const generateOptions = () => {
        const avatars: AvatarType[] = [];

        Array.from({ length: 25 }, (x, i) => {
            const avatar = {
                value: `https://mdbcdn.b-cdn.net/img/new/avatars/${i + 1}.webp`,
                label: `Avatar ${i + 1}`,
                image: `https://mdbcdn.b-cdn.net/img/new/avatars/${i + 1}.webp`
            }

            avatars.push(avatar);
        })
        return avatars;
    }

    const stylesForSelect = {
        option: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: '#fff',
            '&:hover': { backgroundColor: '#fff', boxShadow: '0 0 10px 100px #0D70B6 inset', color: '#fff', cursor: 'pointer' }

        }),
        menuList: (baseStyles: any) => ({
            ...baseStyles,
            '::-webkit-scrollbar': { display: 'none' }
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: '#fff',
            marginBottom: '2rem',
        }),

    }

    const SelectAvatar = () => {
        const avatars = generateOptions();
        return (
            <Select
                styles={stylesForSelect}
                isClearable
                hideSelectedOptions
                value={selectedAvatar}
                placeholder='Select avatar'
                options={avatars}
                onChange={(avatar: SingleValue<AvatarType | null>) => changeAvatar(avatar)}
                formatOptionLabel={(avatar: AvatarType) => (
                    <div className='avatars-option'>
                        {avatar.image && <img src={avatar.image} alt={avatar.label} />}
                        <p>{avatar.label}</p>
                    </div>
                )}


            />
        )
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
                <div className="mb-3">
                    <SelectAvatar />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3">
                        Sign Up
                    </button>
                </div>
                <p className='mt-3'>
                    Already registered? <a href="/login">sign in</a>
                </p>
            </form >

        </div >
    )
}

export default Signup;