import React, { Component } from 'react';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import ContactItem from './Components/ContactItem';
import Filter from './Components/Filter';
export default class App extends Component {
  state = {
    filter: '',
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };
  addNewContact = obj => {
    const repeatingName = this.state.contacts
      .map(contact => contact.name)
      .includes(obj.name);
    if (repeatingName) {
      alert(`${obj.name} is already in contacts`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, obj],
        };
      });
    }
  };
  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== itemId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };
  getVisibleItems = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(e =>
      e.name.toLowerCase().includes(normalizedFilter),
    );
  };
  render() {
    const visibleItem = this.getVisibleItems();
    const { addNewContact, changeFilter, deleteItem } = this;
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList>
          <ContactItem state={visibleItem} onDeleteItem={deleteItem} />
        </ContactList>
      </div>
    );
  }
}
