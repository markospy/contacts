import { queryOptions } from "@tanstack/react-query";
import { getAllContacts, getContactById, getContactByName, createContact, updateContact, deleteContact } from "./api";
import { ContactUpdate } from '../types/conctact'


export const contactListQuery = () =>
	queryOptions({
		queryKey: ['contacts', 'get'],
		queryFn: () => getAllContacts(),
	})

export const contactNameQuery = (name: string) =>
	({
		queryKey: ['contacts', 'get', name],
		queryFn: () => getContactByName(name),
	})

export const contactIdQuery = (contactId: string) =>
	queryOptions({
		queryKey: ['contact', 'get', contactId],
		queryFn: () => getContactById(contactId),
	})

export const contactUpdate = (contactId: string, updates: ContactUpdate) =>
	queryOptions({
		queryKey: ['contact', 'update'],
		queryFn: () => updateContact(contactId, updates),
		staleTime: 0,
	})

export const contactDelete = (contactId: string) =>
	queryOptions({
		queryKey: ['contact', 'delete'],
		queryFn: () => deleteContact(contactId),
		staleTime: 0,
	})