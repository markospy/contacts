import bson
from bson import ObjectId
from fastapi import status
from fastapi.exceptions import HTTPException
from mongo_db import db


def verify_id(contact_id: str):
    """Verificar que el _id sea válido"""
    try:
        contact_id = ObjectId(contact_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ID.")


def get_contact(contact_id: str | None = None, name: str | None = None):
    """Verificar que el contacto exista en la base de datos y lo devuelve"""
    if contact_id:
        count, contact = db.find_one_document("contacts", {"_id": ObjectId(contact_id)})
    else:
        filter = {
            "$or": [
                {"first_name": {"$regex": name, "$options": "i"}},
                {"last_name": {"$regex": name, "$options": "i"}},
            ]
        }
        count, contact = db.find_documents_by_name("contacts", filter)
    if not count:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact no found.")
    return count, contact
