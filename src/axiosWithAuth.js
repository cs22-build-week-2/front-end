import axios from 'axios'; 

const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return axios.create({
        headers: {
            Authorization: `Token ${token}`
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api'
    })
}

export default axiosWithAuth