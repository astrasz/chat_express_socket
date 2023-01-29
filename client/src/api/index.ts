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

export const getUsers = async (token: string | '') => {
    return await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const findConversationByParticipants = async (token: string, partnerId: string) => {
    return await fetch(`/api/conversations?partner=${partnerId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createConversation = async (token: string, partnerId: any) => {
    return await fetch('/api/conversations', {
        method: 'POST',
        body: partnerId,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}