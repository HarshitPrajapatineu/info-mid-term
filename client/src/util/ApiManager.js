
import axios from 'axios';
import { BASE_URL } from './StringConstants';

const ApiManager = () => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const post = (endpoint, data) => {

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
