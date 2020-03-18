import axios from 'axios';

function login(){
    axios.post('/').then(res => console.log(res))
}


export { login, register, auth }