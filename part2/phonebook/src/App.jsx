import { useState } from 'react'
import contactService from "./services/persons"
import { useEffect } from 'react'

const Filter = (props) =>{
  return (
    <div>filter shown with
        <input value={props.filter} onChange={props.handleFilter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
        <div>name: <input onChange={props.updateName} value={props.newName} /></div>
        <div>number: <input onChange={props.updateNumber} value={props.newNum}/></div>
        <div>
          <button type="submit" onClick={props.addNewContact}>add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <div>
        {
          props.persons
            .filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
            .map(person => <Person person={person} key={person.id} handleDel={props.handleDel}></Person>)
        }
    </div>
  )
}

const Person = (props) => {
  const handleDel = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)){
      contactService.deleteContact(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>{props.person.name} {props.person.number} <button onClick={()=>props.handleDel(props.person)}>delete</button></div>
  )

}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const deleteContact = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      contactService.deleteContact(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {
        setNotificationMessage(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.filter(p => p.id !== person.id));
      })
    }
  }

  const updateContact = (event) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName);
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newObject = { name: newName, number: newNum };
        contactService
          .updateContact(person.id, newObject)
          .then(data => {
            setPersons(persons.map(p => p.id !== person.id ? p : data));
            setNewName('');
            setNewNum('');
            setNotificationMessage(`Updated ${newName}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const newObject = { name: newName, number: newNum };
      contactService
        .createContact(newObject)
        .then(data => {
          setPersons([...persons, data]);
          setNotificationMessage(`Added ${newName}`);
          setNewName('');
          setNewNum('');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };
  
  

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNum(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addNewContact={updateContact} newName={newName} updateName={updateName} newNum={newNum} updateNumber={updateNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDel={deleteContact}/>
    </div>
  )
}

export default App