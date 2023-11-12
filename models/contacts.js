// const fs = require("node:fs/promises");

// const path = require("node:path");

// const crypto = require("node:crypto");

// const contactsPath = path.join(__dirname, "contacts.json");

// async function readContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// }

// function writeContacts(contacts) {
//   return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
// }

// const listContacts = async () => {
//   const contactsList = await readContacts();

//   return contactsList;
// };

// const getContactById = async (contactId) => {
//   const contactsList = await readContacts();
//   const contact =
//     contactsList.find((contact) => contact.id === contactId) || null;

//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contactsList = await readContacts();
//   const index = contactsList.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const deleteContact = [
//     contactsList.slice(0, index),
//     ...contactsList.slice(index + 1),
//   ];
//   await writeContacts(deleteContact);

//   return contactsList[index];
// };

// const addContact = async (name, email, phone) => {
//   const contactsList = await readContacts();
//   const newContact = {
//     id: crypto.randomUUID(),
//     name: name,
//     email: email,
//     phone: phone,
//   };
//   contactsList.push(newContact);

//   await writeContacts(contactsList);
//   return newContact;
// };

// const updateContact = async (contactId, name, email, phone) => {
//   const contactsList = await readContacts();
//   const index = contactsList.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }
//   contactsList[index] = {
//     id: contactId,
//     name: name,
//     email: email,
//     phone: phone,
//   };

//   await writeContacts(contactsList);
//   return contactsList[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/contacts-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Database connection error:", error);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

// Оголосіть схему моделі
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

// Створіть модель зі схемою
const Contact = mongoose.model("Contact", contactSchema);

// Оновлені функції обробки запитів

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.error("Error listing contacts:", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    console.log(contact);
    return contact;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
  }
};

const addContact = async (newContact) => {
  try {
    const contact = new Contact(newContact);
    const savedContact = await contact.save();
    console.log(savedContact);
    return savedContact;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

const updateContact = async (contactId, updatedContact) => {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, updatedContact, {
      new: true,
    });
    console.log(contact);
    return contact;
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndRemove(contactId);
    console.log("Contact removed:", contact);
    return contact;
  } catch (error) {
    console.error("Error removing contact:", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
