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

export const logout = async (token: string) => {
    return await fetch('/api/logout', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


//users

export const getUsers = async (token: string | '') => {
    return await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//conversations

export const findConversationByParticipants = async (token: string, partnerId: string) => {
    return await fetch(`/api/conversations?partner=${partnerId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createConversation = async (token: string, data: any) => {
    return await fetch('/api/conversations', {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const getMessagesByConversationId = async (token: string, conversationId: string, queryParams: any = {}) => {
    const { offset } = queryParams;
    let url = `/api/conversations/${conversationId}/messages`;
    if (offset) {
        url = `/api/conversations/${conversationId}/messages?offset=${offset}`;
    }
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addMessageToConversation = async (token: string, conversationId: string, content: string) => {
    return await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const updateParticipation = async (token: string, participationId: string, lastChecked: string) => {
    return await fetch(`/api/participations/${participationId}`, {
        method: 'PUT',
        body: lastChecked,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}