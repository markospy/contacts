from crud import (
    create_contact,
    delete_contact,
    get_all_contacts,
    get_contact_by_id,
    update_contact,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import Contact, ContactOut, ContactUpdate

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/contacts", status_code=200)
async def get_all(skip: None | int = None, limit: None | int = None):
    """Obtiene una lista de todos los contactos almacenados en la base de datos."""
    count, contacts_all = get_all_contacts(skip, limit)
    contacts = []
    for contact in contacts_all:
        contacts.append(ContactOut(**contact))
    return {"count": count, "contacts": contacts}


@app.get("/contacts/{id}", status_code=200, response_model=ContactOut)
async def get_one(id: str):
    """Obtiene un contacto almacenado en la base de datos por su ID."""
    contact = get_contact_by_id(id)
    return ContactOut(**contact)


@app.post("/contacts", status_code=201, response_model=ContactOut)
async def create(contact: Contact) -> str:
    """Obtiene un contacto almacenado en la base de datos por su ID."""
    id = create_contact(contact.model_dump())
    contact_created = get_contact_by_id(id)
    return ContactOut(**contact_created)


@app.put("/contacts/{id}", status_code=200, response_model=ContactOut)
async def update(id: str, contact: ContactUpdate):
    """Actualiza un contacto almacenado en la base de datos por su ID."""
    update_contact(id, contact.model_dump(exclude_unset=True))
    contact = get_contact_by_id(id)
    return ContactOut(**contact)


@app.delete("/contacts/{id}", status_code=204)
async def delete(id: str):
    """Actualiza un contacto almacenado en la base de datos por su ID."""
    delete_contact(id)
