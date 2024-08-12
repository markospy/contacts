import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query';
import { contactListQuery, contactPostQuery } from '../fectching/query.ts'
import { ContactsOutArray } from '../types/conctact.ts'


export async function loader(queryClient: QueryClient) {
  const data = await queryClient.ensureQueryData(contactListQuery());
  if (data) return data as ContactsOutArray;
  return false as boolean;
}

export async function action(queryClient: QueryClient) {
  const contact = await queryClient.ensureQueryData(contactPostQuery());
  await queryClient.invalidateQueries({ queryKey: ['contacts', 'get'], exact: true })
  return redirect(`/contact/${contact._id}/edit`);
}

export default function Root() {
    const data = useLoaderData() as ContactsOutArray | false;
    const contacts = data ? data.contacts : false;
    const navigation = useNavigation();

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
            {contacts ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    <NavLink
                      to={`contact/${contact._id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {contact.first_name && contact.first_name}
                      {" "}
                      {contact.last_name && contact.last_name}
                      {" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
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
        <div 
         id="detail"
         className={navigation.state === "loading" ? "loading" : ""}
        >
          <Outlet />
        </div>
      </>
    );
  }