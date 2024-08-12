import { queryOptions } from "@tanstack/react-query";
import { getContacts, getContact, createContact, updateContact } from "./api";
import { ContactUpdate } from '../types/conctact'


export const contactListQuery = () =>
	queryOptions({
		queryKey: ['contacts', 'get'],
		queryFn: () => getContacts(),
	})

export const contactQuery = (contactId: string) =>
	queryOptions({
		queryKey: ['contact', 'get', contactId],
		queryFn: () => getContact(contactId),
	})

export const contactPostQuery = () =>
	queryOptions({
		queryKey: ['contact', 'post'],
		queryFn: async () => await createContact(),
	})

export const contactUpdate = (contactId: string, updates: ContactUpdate) =>
	queryOptions({
		queryKey: ['contact', 'update'],
		queryFn: () => updateContact(contactId, updates),
	})