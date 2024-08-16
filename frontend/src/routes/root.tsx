import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { contactListQuery, contactFilterQuery, contactPostQuery } from '../fectching/query.ts'
import { ContactsOutArray } from '../types/conctact.ts'
import { string } from 'zod';


export const loader = (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    if (request) {
      const url = new URL(request.url);
      const q = url.searchParams.get("q")
      if (q) {
        const contacts = await queryClient.fetchQuery(contactFilterQuery(q));
        if (contacts.count) {
          return { contacts, q }
        } else {
          return { contacts, q };
        }
      }
    }
    const contacts = await queryClient.fetchQuery(contactListQuery());
    if (contacts.count) return { contacts, ' ':string };
    return { contacts, ' ':string };
}

export async function action(queryClient: QueryClient) {
  const contact = await queryClient.fetchQuery(contactPostQuery());
  await queryClient.invalidateQueries({ queryKey: ['contacts', 'get'], exact: true })
  return redirect(`/contact/${contact._id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData() as { contacts: ContactsOutArray | false, q: string  };
    console.log(contacts)
    const contacts_list = contacts ? contacts.contacts : false;
    console.log(contacts_list)
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    useEffect(() => {
      if (typeof q === 'undefined') {
        document.getElementById("q").value = ''
      } else {
        document.getElementById("q").value = q;
      }
    }, [q])

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search" >
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
              <div className="sr-only" aria-live="polite"></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts_list ? (
              <ul>
                {contacts_list.map((contact) => (
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