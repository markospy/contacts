import { queryOptions } from "@tanstack/react-query";
import { getContacts, getContact, getContactByName, createContact, updateContact, deleteContact } from "./api";
import { ContactUpdate } from '../types/conctact'


export const contactListQuery = () =>
	queryOptions({
		queryKey: ['contacts', 'get'],
		queryFn: () => getContacts(),
		staleTime: 0,
	})

export const contactNameQuery = (name: string) =>
	({
		queryKey: ['contacts', 'get', name],
		queryFn: () => getContactByName(name),
		staleTime: 0,
	})

export const contactIdQuery = (contactId: string) =>
	queryOptions({
		queryKey: ['contact', 'get', contactId],
		queryFn: () => getContact(contactId),
		staleTime: 0,
	})

export const contactPostQuery = () =>
	queryOptions({
		queryKey: ['contact', 'post'],
		queryFn: () => createContact(),
		staleTime: 0,
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