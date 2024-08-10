import { Outlet, Link, useLoaderData, Form, redirect } from 'react-router-dom'
import { contactListQuery, contactPostQuery } from '../fectching/query.ts'
import { QueryClient } from '@tanstack/react-query'
import { ContactsOutArray, ContactsOut } from '../types/conctact.ts'


export const loader = async (queryClient: QueryClient) => {
  const data = await queryClient.ensureQueryData(contactListQuery());
  return data as ContactsOutArray;
};

export const action = async () => {
  const  { contact }  = await contactPostQuery();
  return redirect(`/contacts/${contact._id}`);
};

export default function Root() {
    const { contacts } = useLoaderData() as ContactsOutArray;
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    <Link to={`contact/${contact._id}`} >
                      {contact.first_name && contact.first_name}
                      {" "}
                      {contact.last_name && contact.last_name}
                      {" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }