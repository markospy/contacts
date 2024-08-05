import { Outlet, Link, useLoaderData } from 'react-router-dom'
import { Contacts } from '../fectching/query.ts'

export async function loader() {
  const contacts  = await Contacts();
  return contacts
}

export default function Root() {
    const { contacts } = useLoaderData();
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
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    <Link to={`contact/${contact._id}`} >
                      {contact.first_name || contact.last_name && (
                        <>
                          {contact.first_name} {contact.last_name}
                        </>
                      )}{" "}
                      {contact.favorite && <span>🤍</span>}
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