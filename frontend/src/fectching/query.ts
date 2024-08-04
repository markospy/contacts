import { useQuery  } from "@tanstack/react-query";
import { getContacts } from "./api";


export const Contacts = () => useQuery({ 
	queryKey: ['contacts'],
	queryFn: getContacts
});