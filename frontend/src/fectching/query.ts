import { useQuery  } from "@tanstack/react-query";
import { getContacts } from "./api";


export const Contacts = () => {
	const { isPending, isError, data, error } = useQuery(
	{
		queryKey: ['contacts'],
		queryFn: getContacts
	});

	if (isPending) {
		return {'status': 'pending'};
	}

	if (isError) {
		return {'error': error}
	}

	return data;
}