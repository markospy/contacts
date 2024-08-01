from fastapi import FastAPI

from crud import (
    create_contact,
    delete_contact,
    get_all_contacts,
    get_contact_by_id,
    update_contact,
)
from schemas import Contact, ContactOut

app = FastAPI()


@app.get("/contact", status_code=200)
async def get_all(skip: None | int = None, limit: None | int = None):
    """Obtiene una lista de todos los contactos almacenados en la base de datos."""
    count, contacts_all = get_all_contacts(skip, limit)
    contacts = []
    for contact in contacts_all:
        contacts.append(ContactOut(**contact))
    return {"count": count, "contacts": contacts}


@app.get("/contact/{id}", status_code=200, response_model=ContactOut)
async def get_one(id: str):
    """Obtiene un contacto almacenado en la base de datos por su ID."""
    contact = get_contact_by_id(id)
    return ContactOut(**contact)


@app.post("/contact", status_code=201, response_model=ContactOut)
async def create(contact: Contact) -> str:
    """Obtiene un contacto almacenado en la base de datos por su ID."""
    id = create_contact(contact.model_dump())
    contact_created = get_contact_by_id(id)
    return ContactOut(**contact_created)


@app.put("/contact/{id}", status_code=200, response_model=ContactOut)
async def update(id: str, contact: Contact):
    """Actualiza un contacto almacenado en la base de datos por su ID."""
    update_contact(id, contact.model_dump())
    contact = get_contact_by_id(id)
    return ContactOut(**contact)


@app.delete("/contact/{id}", status_code=204)
async def delete(id: str):
    """Actualiza un contacto almacenado en la base de datos por su ID."""
    delete_contact(id)
