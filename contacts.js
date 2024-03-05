import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join('db', 'contacts.json');

export async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Помилка при читанні файлу: ${error.message}`);
    }
  }

 export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  }

 export async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    } catch (error) {
      throw new Error(`Помилка при записі файлу: ${error.message}`);
    }
  }

  export async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const removedIndex = contacts.findIndex((contact) => contact.id === contactId);
      if (removedIndex === -1) {
        return null;
      }
      const removedContact = contacts.splice(removedIndex, 1)[0]; 
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    } catch (error) {
      throw new Error(`Помилка при записі файлу: ${error.message}`);
    }
  }

  export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };