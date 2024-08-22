from datetime import datetime
from typing import Annotated, List

from pydantic import AnyUrl, BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from pydantic_extra_types.country import CountryAlpha3
from pydantic_extra_types.phone_numbers import PhoneNumber

PyObjectId = Annotated[str, BeforeValidator(str)]


class Contact(BaseModel):
    first_name: str
    last_name: str | None = None
    photo: AnyUrl | None = None
    date_birth: datetime | None = None
    phone: list[PhoneNumber] | None = None
    country: CountryAlpha3 | None = None
    twitter: str | None = None
    description: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    company: str | None = None
    job_title: str | None = None
    favorite: bool | None = None


class ContactUpdate(Contact):
    first_name: str | None = None
    favorite: bool | None = None


class ContactOut(Contact):
    id: PyObjectId = Field(alias="_id", default=None)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "_id": "605c72ef2f8fb814b2d6f6b4",
                "first_name": "Juan",
                "last_name": "Pérez",
                "date_birth": "1990-01-01",
                "phone": "+1 123 456 7890",
                "country": "MEX",
                "twitter": "@juanperez",
                "description": "Ingeniero de software con experiencia en desarrollo web y móvil.",
                "email": "juan.perez@example.com",
                "address": "Calle 123, Ciudad, Estado, País",
                "company": "Ejemplo de empresa",
                "job_title": "Ingeniero de software",
                "favorite": "True",
            }
        },
    )


class ContactOutCount(BaseModel):
    count: int
    contacts: List[ContactOut]

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "count": 1,
                "contacts": [
                    {
                        "_id": "605c72ef2f8fb814b2d6f6b4",
                        "first_name": "Juan",
                        "last_name": "Pérez",
                        "date_birth": "1990-01-01",
                        "phone": "+1 123 456 7890",
                        "country": "MEX",
                        "twitter": "@juanperez",
                        "description": "Ingeniero de software con experiencia en desarrollo web y móvil.",
                        "email": "juan.perez@example.com",
                        "address": "Calle 123, Ciudad, Estado, País",
                        "company": "Ejemplo de empresa",
                        "job_title": "Ingeniero de software",
                        "favorite": "True",
                    }
                ],
            }
        },
    )
