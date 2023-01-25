// auth

export const signup = async (user: any) => {
    return await fetch('/api/signup', {
        method: 'POST',
        body: user,
        headers: { 'Content-Type': 'application/json' }
    })
}

export const signin = async (credentials: any) => {
    return await fetch('/api/login', {
        method: 'POST',
        body: credentials,
        headers: { 'Content-Type': 'application/json' }
    })
}

export const logout = async () => {
    return await fetch('/api/login', {
        method: 'GET',
    })
}