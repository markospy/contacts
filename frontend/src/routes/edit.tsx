import { Form, useLoaderData, redirect, LoaderFunctionArgs, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { ContactsOut } from '../types/conctact.ts'
import { updateContact } from "../fectching/api.ts";
import clm from 'country-locale-map'


const regex = /\d+/g;

export const action = (queryClient: QueryClient) => async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data)
  const phone_1 = formData.get('phone_1');
  const phone_2 = formData.get('phone_2');
  console.log(phone_1);
  console.log(phone_2);

  const updates = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (key === 'phone_1' || key === 'phone_2') {
        return ['phone', []]; // Devolvemos undefined para omitir esta entrada
      }
      if (typeof value === 'string' && value === '') {
        return [key, null]; // o [key, NaN] si prefieres
      }
      return [key, value];
    })
  );

  if (phone_1 && phone_2) {
    updates.phone = [phone_1, phone_2];
  } else if (phone_1) {
    updates.phone = [phone_1];
  } else if (phone_2) {
    updates.phone = [phone_2];
  }

  if (params.contactId){
    await updateContact(params.contactId, updates);
    await queryClient.invalidateQueries({ queryKey: ['contacts', 'get'], exact: true })
    return redirect(`/contact/${params.contactId}`);
  }
}

export default function EditContact() {
  const contact = useLoaderData() as ContactsOut;
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form" className='flex flex-col gap-2 w-fit text-gray-700'>
      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <span className='font-semibold'>Name</span>
        <section className="flex gap-2">
          <input
            placeholder="First name"
            aria-label="First name"
            type="text"
            name="first_name"
            defaultValue={contact?.first_name}
            className="ml-[26px] h-9"
          />
          <input
            placeholder="Last name"
            aria-label="Last name"
            type="text"
            name="last_name"
            defaultValue={contact?.last_name}
            className="h-9"
          />
        </section >
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
        <span className='font-semibold'>Photo</span>
        <input
          type="url"
          name="photo"
          placeholder="https://www.images.com/youphoto.png"
          defaultValue={contact.photo}
          className="ml-[26px] h-9 w-[428px]"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
				</svg>
        <span className='font-semibold'>Birtday</span>
        <input
          type="date"
          name="date_birth"
          placeholder="@jack"
          defaultValue={contact.date_birth?.split('T')[0]}
          className="ml-[17px] h-9"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
        </svg>
        <span className='font-semibold'>Country</span>
        <select name="country" className="bg-transparent border-none rounded-md h-9 max-w-52 pl-3 ml-[10px]">
        {
          contact.country ?
            <option value={contact.country}>{clm.getCountryByAlpha3(contact.country)?.name}</option>
            :
            <option value="">Please choose a country</option>
        }
          {
            clm.getAllCountries().map(country =>
              <option value={clm.getAlpha3ByName(country.name)}>
                {country.name}
              </option>)
          }
        </select>
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
        </svg>
        <span className='font-semibold'>Address</span>
        <input
          type="text"
          name="address"
          placeholder="Calle Green Tree, 421, Miami Beach, Florida"
          defaultValue={contact?.address}
          className="ml-[10px] h-9"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
        <span className='font-semibold'>Phones</span>
        <section className="flex gap-2 ml-[15px]">
          {(contact?.phone && contact.phone.length > 0)  ?
            contact.phone.map((phone, index) =>
              <input
                type="tel"
                name={`phone_${index+1}`}
                placeholder="+ 53 53494865"
                defaultValue={`+${phone.match(regex).join('') || ' '}`}
                className="w-36 h-9"
              />
            )
            :
            <>
              <input
                type="tel"
                name="phone_1"
                placeholder="+ 53 53494865"
                className="w-36 h-9"
              />
              <input
                type="tel"
                name="phone_2"
                placeholder="+ 53 53494865"
                className="w-36 h-9"
              />
            </>
          }
          {contact.phone?.length == 1 &&
            <input
              type="tel"
              name="phone_2"
              placeholder="+ 53 53494865"
              className="w-36 h-9"
            />
          }
        </section>
      </label>

      <label className='flex gap-2 items-center'>
        <svg className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
          <path d="M3 7l9 6l9 -6" />
        </svg>
        <span className='font-semibold'>Email</span>
        <input
          type="email"
          name="email"
          placeholder="person@example.com"
          defaultValue={contact?.email}
          className="ml-[29px] h-9"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg className="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
        </svg>
        <span className='font-semibold'>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
          className="ml-[18px] h-9"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
        </svg>
        <span className='font-semibold'>Company</span>
        <input
          type="text"
          name="company"
          placeholder="Creative Agency"
          defaultValue={contact?.company}
          className="h-9"
        />
      </label>

      <label className='flex gap-2 items-center'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
        <span className='font-semibold'>Work</span>
        <input
          type="text"
          name="job_title"
          placeholder="Fashion Designer"
          defaultValue={contact?.job_title}
          className="ml-[30px] h-9"
        />
      </label>

      <label className='flex gap-2 items-center mt-3'>
        <textarea
          name="description"
          defaultValue={contact?.description}
          rows={4}
          cols={70}
          maxLength={300}
        />
      </label>

      <p className="flex justify-end gap-6 mt-6">
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)} className="text-red-500">Cancel</button>
      </p>
    </Form>
  );
}