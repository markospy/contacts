import { LoaderFunctionArgs, useLoaderData, useFetcher, Link } from "react-router-dom";
import { QueryClient } from '@tanstack/react-query';
import { ContactsOut } from '../types/conctact';
import { contactIdQuery, contactUpdate } from '../fectching/query';
import ContactInfo from '../components/ContactInfo'

export const loader = (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (typeof params.contactId === 'string') {
      const contact = await queryClient.fetchQuery(contactIdQuery(params.contactId));
      if (!contact) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }

      return contact as ContactsOut;
    }
  }

  export const action = (queryClient: QueryClient) => async ({ request, params }: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates)
    if (params.contactId){
      return await queryClient.fetchQuery(contactUpdate(params.contactId, updates));
    }
    return null;
  }

export default function Contact() {
  const contact = useLoaderData() as ContactsOut;

  return (
    <>
      <ContactInfo contact={contact}>
        <Favorite contact={contact} />
      </ContactInfo>
      <Link to='/' className="flex flex-col items-center justify-end text-gray-700 hover:text-blue-600 border-gray-300 border-[1px]  rounded-lg hover:bg-gray-50">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <p className="text-sm font-bold">Go to Home</p>
      </Link>
    </>
  );
}

function Favorite({ contact }: { contact: ContactsOut }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        className="border-none text-yellow-500 shadow-none hover:border-none hover:shadow-none text-xl p-0 m-0"
        title={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}