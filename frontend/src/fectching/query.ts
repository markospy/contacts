import { getAllContacts, getContactById, getContactByName} from "./api";

export const contactListQuery =
	{
		queryKey: ['contacts', 'get'],
		queryFn: () => getAllContacts(),
	};

export const contactNameQuery = (name: string) =>
	({
		queryKey: ['contacts', 'get', name],
		queryFn: () => getContactByName(name),
	});

export const contactIdQuery = (contactId: string) =>
	({
		queryKey: ['contact', 'get', contactId],
		queryFn: () => getContactById(contactId),
	});

