import axios from 'axios';
import { ContactsOutArray, ContactsOut } from '../types/conctact'


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' }
})

export const getContacts = async (): Promise<ContactsOutArray>  => {
  return instance.get('/contacts')
    .then(res => {
      console.log(res.data);
      return res.data;
    })
};

export const getContact = async (contactId: string): Promise<ContactsOut>  => {
  return instance.get(`/contacts/${contactId}`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
};

export const createContact = (): Promise<ContactsOut> => {
  return instance.post('/contacts/', {
    "first_name": "Desconocido",
    "favorite": false
  }).then(response => {
    console.log(response.data);
    return response.data;
  })
}