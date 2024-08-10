import axios from 'axios';
import { ContactsOutArray, ContactsOut } from '../types/conctact'


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' }
})

export const getContacts = ()  => {
  return instance.get<ContactsOutArray>('/contacts')
    .then(res => {
      console.log(res.data);
      return res.data;
    })
};


export const createContact = () => {
  return instance.post<ContactsOut>('/contacts/', {
    "first_name": "Desconocido",
    "favorite": false
  }).then(res => {
    console.log(res);
    return res;
  })
}