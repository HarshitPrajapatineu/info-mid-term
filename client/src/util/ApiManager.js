
import axios from 'axios';
import { BASE_URL } from './StringConstants';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

const ApiManager = () => {


    const token = localStorage.getItem("token")

    const options = 
    token ? 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
        }
    } :
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const post = (endpoint, data = null) => {

        return axios.post(BASE_URL + endpoint, data, options);
    }

    const get = (endpoint, data) => {

        return axios.get(BASE_URL + endpoint, options);
    }

    return ({
        post: post,
        get: get
    });

}

export default ApiManager;
