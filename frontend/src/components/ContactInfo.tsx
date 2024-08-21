import { Form, Link } from "react-router-dom";
import { PropsWithChildren } from 'react';
import {ContactsOut} from '../types/conctact.ts'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import clm from 'country-locale-map'

const regex = /\d+/g;

type Contact = {
	contact: ContactsOut
}

function formatDate( dateStr: string ) {
	const date = new Date(dateStr);
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

	return formattedDate
}

const ContactInfo = (props: PropsWithChildren<Contact>) => {
	const contact = props.contact;
  return (
		<div className='flex gap-6 text-gray-700'>
			{(Object.keys(contact).length > 0) &&
				<>
					<div className="flex flex-col gap-4 min-w-56">
						<img
							key={contact._id}
							src={
								contact.first_name &&
								`https://robohash.org/${contact._id}.png?size=200x200`
							}
							className="rounded-lg"
						/>
						<div className="flex gap-6 justify-center">
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


					<div className='flex flex-col gap-4'>
						<div className='flex gap-5'>
							<h1 className='font-semibold text-2xl'>
								{contact.first_name || contact.last_name ? (
									<>
										{contact.first_name} {contact.last_name}
									</>
								) : (
									<i>No Name</i>
								)}{" "}
							</h1>
							<span className='p-0 m-0'>{props.children}</span>
						</div>


						<div className='flex flex-col gap-3'>
							{
								contact.date_birth &&
									<div className='flex gap-2'>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
										</svg>
										<h2 className='font-semibold'>Birtday:</h2>
										<p>{ formatDate(contact.date_birth) }</p>
									</div>
							}
							<div className='flex gap-2 items-center'>
								{
									contact.country &&
										<div className='flex gap-2 items-center'>
											<span className="text-2xl">{getUnicodeFlagIcon(contact.country)}</span>
											<h2 className='font-semibold'>{ clm.getCountryNameByAlpha3(contact.country) }:</h2>
										</div>
								}
								{
									contact.address &&
										<div className='flex gap-2'>
											<a href={`https://www.google.com/maps/place/${contact.address}`} target='_blank' className='hover:text-blue-600'>{ contact.address }</a>
										</div>
								}
							</div>
							{
								contact.phone &&
									<section className='flex gap-2 items-center'>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
										</svg>
										<h2 className='font-semibold'>Phones:</h2>
										<ul className='flex gap-2'>
											{
												contact.phone.map((phone, index) => {
													return (
														<li key={index}>
															<a href={phone} className='hover:text-blue-600'>
																{phone.match(regex).join('') || ' '}
															</a>
															{index === contact.phone.length - 1 ? '' : ','}
														</li>
													)
												})
											}
										</ul>
									</section>
							}
							<div className='flex gap-8'>
								{
									contact.email &&
										<div className='flex gap-2 items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
												<path d="M3 7l9 6l9 -6" />
											</svg>
											<h2 className='font-semibold'>Email:</h2>
											<a href={`mailto:${contact.email}`} target='_blank' className='hover:text-blue-600'>{ contact.email }</a>
										</div>
								}
								{
									contact.twitter &&
										<div className='flex gap-2 items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
											</svg>
											<h2 className='font-semibold'>Twiter:</h2>
											<a href={`https://twitter.com/${contact.twitter}`} target='_blank' className='hover:text-blue-600'>{ contact.twitter }</a>
										</div>
								}
							</div>
							<div className='flex gap-8 items-center'>
								{
									contact.company &&
										<div className='flex gap-2 items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
												<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
											</svg>
											<h2 className='font-semibold'>Company:</h2>
											<p>{ contact.company }</p>
										</div>
								}
								{
									contact.job_title &&
										<div className='flex gap-2 items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
												<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
											</svg>
											<h2 className='font-semibold'>Work:</h2>
											<p>{ contact.job_title }</p>
										</div>
								}
							</div>
							{
								contact.description &&
								<section>
									{contact.description}
								</section>
							}
						</div>
					</div>
				</>
			}
		</div>
  );
}

export default ContactInfo;