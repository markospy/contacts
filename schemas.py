from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from pydantic_extra_types.country import CountryAlpha3
from pydantic_extra_types.phone_numbers import PhoneNumber

PyObjectId = Annotated[str, BeforeValidator(str)]


class Contact(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    date_bird: datetime | None = None
    phone: PhoneNumber | None = None
    country: CountryAlpha3 | None = None
    twitter: str | None = None
    description: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    company: str | None = None
    job_title: str | None = None


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
            }
        },
    )
