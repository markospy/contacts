import axios from 'axios';
import { ContactsOutArray, ContactsOut, ContactUpdate } from '../types/conctact'


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' }
})

export const getContacts = async (): Promise<ContactsOutArray>  => {
  return instance.get('/contacts')
    .then(res => {
      return res.data;
    })
    .catch(() => {
      return { contacts: false, error: 'Erro ao obter contatos' };
    })
};

export const getContactByName = async (q: string): Promise<ContactsOutArray> => {
  return instance.get(`/contacts_by_name?name=${q}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      return false
    })
}

export const getContact = async (contactId: string): Promise<ContactsOut>  => {
  return instance.get(`/contacts/${contactId}`)
    .then(res => {
      return res.data;
    })
    .catch((e: Error) => {
      console.log(e);
    })
};

export const createContact = async ():
Promise<ContactsOut> => {
  return instance.post('/contacts/', {
    "first_name": "Desconocido",
    "favorite": false
  }).then(response => {
    return response.data;
  })
  .catch((e: Error) => {
    console.log(e);
  })
}

export const updateContact = async (
  contactId: string,
  updates: ContactUpdate
): Promise<ContactsOut> => {
  return instance.put(`/contacts/${contactId}`, updates)
  .then(response => {
    return response.data;
  })
  .catch((e: Error) => {
    console.log(e);
  })
}


export const deleteContact = async (contactId: string) => {
  return instance.delete(`/contacts/${contactId}`)
  .then(response => {
    return response.data;
  })
  .catch((e: Error) => {
    console.log(e);
  })
}