import { Form, Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { QueryClient } from '@tanstack/react-query';
import { ContactsOut } from '../types/conctact';
import { contactQuery } from '../fectching/query';


export const loader = (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (typeof params.contactId === 'string') {
      const contact = await queryClient.ensureQueryData(contactQuery(params.contactId));
      console.log(contact)
      return contact as ContactsOut;
    }
  }

export function Contact() {
  const contact = useLoaderData() as ContactsOut;

  return (
    <div id="contact">
      <div>
        <img
          key={contact._id}
          src={
            contact.first_name &&
            `https://robohash.org/${contact._id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <Link to="edit">
            <button>Edit</button>
          </Link>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: ContactsOut }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}