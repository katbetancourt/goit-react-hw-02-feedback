// ContactItem.js
import React from 'react';

const ContactItem = ({ contact, onRemove }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button type="button" onClick={onRemove}>
        Remove
      </button>
    </li>
  );
};

export default ContactItem;
