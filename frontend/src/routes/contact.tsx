import { LoaderFunctionArgs, useLoaderData, useFetcher } from "react-router-dom";
import { QueryClient } from '@tanstack/react-query';
import { ContactsOut } from '../types/conctact';
import { contactQuery, contactUpdate } from '../fectching/query';
import ContactInfo from '../components/ContactInfo'

export const loader = (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (typeof params.contactId === 'string') {
      const contact = await queryClient.fetchQuery(contactQuery(params.contactId));
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