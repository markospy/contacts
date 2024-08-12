import { Form, useLoaderData, redirect, LoaderFunctionArgs } from "react-router-dom";
import { ContactsOut } from '../types/conctact.ts'
import { contactUpdate } from '../fectching/query';
import { queryClient } from '../main.tsx'

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates)
  if (params.contactId){
    await queryClient.ensureQueryData(contactUpdate(params.contactId, updates));
    return redirect(`/contact/${params.contactId}`);
  }
}

export default function EditContact() {
  const contact = useLoaderData() as ContactsOut;

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First name"
          aria-label="First name"
          type="text"
          name="first_name"
          defaultValue={contact?.first_name}
        />
        <input
          placeholder="Last name"
          aria-label="Last name"
          type="text"
          name="last_name"
          defaultValue={contact?.last_name}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={contact?.description}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}