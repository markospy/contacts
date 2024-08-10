import { queryOptions } from "@tanstack/react-query";
import { getContacts, createContact } from "./api";

export const contactListQuery = () =>
	queryOptions({
		queryKey: ['contacts', 'get'],
		queryFn: () => getContacts(),
	})


export const contactPostQuery = () =>
	queryOptions({
		queryKey: ['contact', 'post'],
		queryFn: () => createContact(),
	})
