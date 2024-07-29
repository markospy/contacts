from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class Contact(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    twitter: str | None = None
    description: str | None = None


class ContactOut(Contact):
    id: PyObjectId = Field(alias="_id", default=None)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "_id": "605c72ef2f8fb814b2d6f6b4",  # Ejemplo de ID de MongoDB en formato hexadecimal
                "first_name": "Juan",
                "last_name": "Pérez",
                "twitter": "@juanperez",  # Ejemplo de un handle de Twitter
                "description": "Ingeniero de software con experiencia en desarrollo web y móvil.",  # Ejemplo de descripción
            }
        },
    )
