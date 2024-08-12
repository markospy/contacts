import { z } from 'zod'

const contactsIn = z.object(
    {
        first_name: z.string({required_error:'Debe escribir un nombe'}),
        last_name: z.string().optional(),
        date_bird: z.string().datetime().optional(),
        phone: z.string().optional(),
        country: z.string().optional(),
        twitter: z.string().optional(),
        description: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        company: z.string().optional(),
        job_title: z.string().optional(),
        favorite: z.boolean().optional(),
    }
)

const contactsOut = contactsIn.extend({_id: z.string()});
const contactUpdate = contactsIn.extend({first_name: z.string().optional()});

const contactsOutArray = z.object({
    count: z.number(),
    contacts: z.array(contactsOut)
});

export type ContactsIn = z.infer<typeof contactsIn>
export type ContactsOut = z.infer<typeof contactsOut>
export type ContactUpdate = z.infer<typeof contactUpdate>
export type ContactsOutArray = z.infer<typeof contactsOutArray>
