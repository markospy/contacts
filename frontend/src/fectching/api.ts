import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: { 'accept': 'application/json' }
})

export const getContact = async () => {
  try {
    const response = await instance.get('contact');
    return response
  } catch (error) {
    return error
  }
}
