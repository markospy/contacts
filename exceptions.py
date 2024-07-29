import bson
from bson import ObjectId
from fastapi import status
from fastapi.exceptions import HTTPException


def verify_id(contact_id: str):
    # Verificar que el _id sea válido
    try:
        contact_id = ObjectId(contact_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ID.")


def verify_contact(contact_id: str, db):
    # Verificar que el contacto exista en la base de datos
    contact = db.find_one_document("contacts", {"_id": ObjectId(contact_id)})
    if contact is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact no found.")
