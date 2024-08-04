import axios from 'axios';
import { ContactsOut } from '../types/conctact'


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' }
})

export const getContacts = ()  => {
  return instance.get<ContactsOut[]>('contact')
    .then(res => res.data)
};
