function validateToken(token) {
    return fetch(`${process.env.REACT_APP_API}/auth`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
}

export default {
    validateToken
};