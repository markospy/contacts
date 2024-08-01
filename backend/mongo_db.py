from pymongo import MongoClient


class Database:
    def __init__(self, uri, database_name):
        self.client = MongoClient(uri)
        self.db = self.client[database_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def insert_one_document(self, collection_name, document):
        collection = self.get_collection(collection_name)
        return collection.insert_one(document)

    def find_all(self, collection_name, skip: int | None = 0, limit: int | None = None):
        collection = self.get_collection(collection_name)
        count = collection.count_documents({})
        if not limit:
            return (count, collection.find())
        else:
            return (count, collection.find(skip=skip, limit=limit))

    def find_one_document(self, collection_name, filter):
        collection = self.get_collection(collection_name)
        return collection.find_one(filter)

    def update_one_document(self, collection_name, filter, updates):
        collection = self.get_collection(collection_name)
        return collection.update_one({"_id": filter}, {"$set": updates})

    def delete_one_document(self, collection_name, filter):
        collection = self.get_collection(collection_name)
        return collection.delete_one({"_id": filter})

    def close(self):
        self.client.close()
