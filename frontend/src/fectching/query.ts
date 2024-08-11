import { queryOptions } from "@tanstack/react-query";
import { getContacts, getContact, createContact } from "./api";

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
		queryFn: () => createContact(),
	})
