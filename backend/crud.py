from bson import ObjectId
from exceptions import get_contact, verify_id
from fastapi import status
from fastapi.exceptions import HTTPException
from mongo_db import db


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
    contact = get_contact(contact_id=contact_id)
    return contact


def get_contact_by_name(name: str):
    """
    Devuelve los conctactos almacenado en la base de datos MongoDB que coincide con el nombre o apellido.

    Args:
        name (str): Nombre o apellido  del contacto a obtener.

    Returns:
        dict: El contacto encontrado, o None si no se encuentra.
    """
    count, contacts = get_contact(name=name)
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
    get_contact(contact_id=contact_id)

    updates["photo"] = str(updates["photo"])
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
    get_contact(contact_id=contact_id)
    result = db.delete_one_document("contacts", ObjectId(contact_id))
    return result.deleted_count
