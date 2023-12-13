import React, { Component } from 'react';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import styles from './App.module.css';
/*import React, { useState } from 'react';*/
import ContactForm from './PhoneBook/ContactForm';
import ContactList from './PhoneBook/ContactList';
import Filter from './PhoneBook/Filter';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };


  handleFeedback = type => {
    this.setState(prevState => ({
      [type]: prevState[type] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const { good } = this.state;
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  addContact = (newContact) => {
    if (this.state.contacts.some((contact) => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`¡${newContact.name} ya está en la agenda!`);
      return;
    }

    this.setState((prevState) => ({ contacts: [...prevState.contacts, newContact] }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({ contacts: prevState.contacts.filter((contact) => contact.id !== id) }));
  };

  render() {
    const { good, neutral, bad, filter, contacts } = this.state;
    const totalFeedback = this.countTotalFeedback();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  


    return (
      <div
        className={styles.container}
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 16,
          color: '#010101',
        }}
      >
        <Section title="Please Leave Feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleFeedback}
          />
          {totalFeedback > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
        <div>
          <h1>Agenda de Contactos</h1>
          <ContactForm addContact={this.addContact} />

          <h2>Contactos</h2>
          <Filter
            value={filter}
            onChange={e => this.setFilter(e.target.value)}
          />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
