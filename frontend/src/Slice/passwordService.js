import axios from "axios"

// const api ="http://127.0.0.1:8000/api/"
const api ="http://18.206.67.13/api/"


const savePassword = async(passwordDetails, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.post(`${api}saved_passwords/`, passwordDetails,config)
    return response.data   
}

const getAllPassword = async(accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.get(`${api}saved_passwords/`, config)
    return response.data   
}

const deletePassword = async(id,accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.delete(`${api}saved_passwords/${id}/`, config)
    return response.data   
}

const passwordService = {
    savePassword, getAllPassword, deletePassword
}
export default passwordService