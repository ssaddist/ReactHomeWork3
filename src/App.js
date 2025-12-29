import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ id: null, firstName: '', lastName: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) return;

    if (isEditing) {
      setContacts(contacts.map(c => (c.id === formData.id ? formData : c)));
      setIsEditing(false);
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, firstName: '', lastName: '', email: '', phone: '' });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const editContact = (contact) => {
    setIsEditing(true);
    setFormData(contact);
  };

  const filteredContacts = contacts.filter(c =>
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="phonebook-app">
        <h1 className="phonebook-title">Телефонна книга</h1>

        <div className="search-container">
          <input
              type="text"
              placeholder="Пошук за прізвищем..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
          />
        </div>

        <form onSubmit={handleSubmit} className="card-panel">
          <h3 className="card-title">{isEditing ? 'Редагувати контакт' : 'Додати новий контакт'}</h3>
          <input className="form-input" name="firstName" placeholder="Ім'я" value={formData.firstName} onChange={handleInputChange} required />
          <input className="form-input" name="lastName" placeholder="Прізвище" value={formData.lastName} onChange={handleInputChange} required />
          <input className="form-input" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <input className="form-input" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleInputChange} required />

          <button type="submit" className="primary-button">
            {isEditing ? 'Зберегти зміни' : 'Додати контакт'}
          </button>

          {isEditing && (
              <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ id: null, firstName: '', lastName: '', email: '', phone: '' })
                  }}
              >
                Скасувати
              </button>
          )}
        </form>

        <div className="card-panel">
          <h3 className="card-title">Список контактів</h3>
          <div className="table-wrapper">
            {filteredContacts.length > 0 ? (
                <table className="contacts-table">
                  <thead>
                  <tr>
                    <th className="table-head-cell">Ім'я</th>
                    <th className="table-head-cell">Прізвище</th>
                    <th className="table-head-cell">Email</th>
                    <th className="table-head-cell">Телефон</th>
                    <th className="table-head-cell">Дії</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredContacts.map(contact => (
                      <tr key={contact.id}>
                        <td className="table-body-cell">{contact.firstName}</td>
                        <td className="table-body-cell">{contact.lastName}</td>
                        <td className="table-body-cell">{contact.email}</td>
                        <td className="table-body-cell">{contact.phone}</td>
                        <td className="table-body-cell">
                          <button onClick={() => editContact(contact)} className="action-button-edit">Редагувати</button>
                          <button onClick={() => deleteContact(contact.id)} className="action-button-delete">Видалити</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                <p className="empty-state-text">Контактів не знайдено.</p>
            )}
          </div>
        </div>
      </div>
  );
}

export default App;