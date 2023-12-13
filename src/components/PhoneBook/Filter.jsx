import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Buscar contactos"
    value={value}
    onChange={e => onChange(e.target.value)}
    className={styles.input}
  />
);

export default Filter;
