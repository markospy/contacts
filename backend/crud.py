from bson import ObjectId
from exceptions import verify_contact, verify_id
from fastapi import status
from fastapi.exceptions import HTTPException
from mongo_db import Database

db = Database(uri="mongodb://localhost:27017/", database_name="contacts")


def create_contact(contact):
    """
    Crea un nuevo contacto en la base de datos MongoDB.

    Args:
        contact (dict): Diccionario que contiene los datos del contacto a crear.

    Returns:
        str: La ID del contacto recién creado como una cadena.
    """
    contact_id = db.insert_one_document("contacts", contact).inserted_id
    return str(contact_id)


def get_contact_by_id(contact_id: str):
    """
    Devuelve un contacto almacenado en la base de datos MongoDB por su ID.

    Args:
        contact_id (str): La ID del contacto a obtener.

    Returns:
        dict: El contacto encontrado, o None si no se encuentra.
    """
    verify_id(contact_id)
    verify_contact(contact_id, db)
    contact = db.find_one_document("contacts", {"_id": ObjectId(contact_id)})
    return contact


def get_contact_by_name(name: str):
    """
    Devuelve los conctactos almacenado en la base de datos MongoDB que coincide con el nombre o apellido.

    Args:
        name (str): Nombre o apellido  del contacto a obtener.

    Returns:
        dict: El contacto encontrado, o None si no se encuentra.
    """
    filter = {
        "$or": [{"first_name": {"$regex": name, "$options": "i"}}, {"last_name": {"$regex": name, "$options": "i"}}]
    }
    count, contacts_cursor = db.find_documents_by_name("contacts", filter)
    contacts = list(contacts_cursor)
    if not contacts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact no found.")
    return (count, contacts)


def get_all_contacts(skip, limit):
    """
    Devuelve una lista de todos los contactos almacenados en la base de datos MongoDB.

    Returns:
        list: Lista de diccionarios, cada uno representando un contacto.
    """
    count, contacts_cursor = db.find_all("contacts", skip, limit)
    contacts = list(contacts_cursor)
    if not contacts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact no found.")
    return (count, contacts)


def update_contact(contact_id: str, updates: dict):
    """
    Actualiza un contacto en la base de datos.

    Args:
        contact_id (ObjectId): El ID del contacto que se desea actualizar.
        updates (dict): Un diccionario con los campos que se desean actualizar.

    Returns:
        int: El número de documentos actualizados.
    """
    verify_id(contact_id)
    verify_contact(contact_id, db)

    # Verificar que solo se actualicen los campos permitidos
    allowed_fields = [
        "first_name",
        "last_name",
        "date_birth",
        "phone",
        "country",
        "twitter",
        "description",
        "email",
        "address",
        "company",
        "job_title",
        "favorite",
    ]
    updates = {field: value for field, value in updates.items() if field in allowed_fields}
    print(updates)
    result = db.update_one_document("contacts", ObjectId(contact_id), updates)
    return result.modified_count


def delete_contact(contact_id: str):
    """
    Elimina un contacto de la base de datos.

    Args:
        contact_id (ObjectId): El ID del contacto que se desea eliminar.

    Returns:
        int: El número de documentos eliminados.
    """
    verify_id(contact_id)
    verify_contact(contact_id, db)
    result = db.delete_one_document("contacts", ObjectId(contact_id))
    return result.deleted_count
