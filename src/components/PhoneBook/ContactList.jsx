// ContactList.js
import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => (
  <ul className={styles.ul}>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => onDelete(contact.id)}>Eliminar</button>
      </li>
    ))}
  </ul>
);

export default ContactList;