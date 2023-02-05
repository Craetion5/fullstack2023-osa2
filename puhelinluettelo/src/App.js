import PersonLister from './components/PersonLister'
import FilterForm from './components/FilterForm'
import SubmitForm from './components/SubmitForm'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import AlertMessage from './components/AlertMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [alertMessageContent, setAlertMessageContent] = useState(null)
  const [alertMessageType, setAlertMessageType] = useState("alert")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (newName === "") {
      alert("please insert a name")
    }
    else if (persons.find(element => element.name.toUpperCase() === newName.toUpperCase())) {
      setNewName('')
      setNewNumber('')
      if (window.confirm(`${newName} is already added. Update phone number?`)) {
        personService
          .update(persons.find(element => element.name === personObject.name).id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.name !== personObject.name ? p : response))
            triggerAlert(`Number updated for ${personObject.name}.`, "alert")
          })
          .catch(error => {
            setPersons(persons.filter(p => p.name !== newName))
            triggerAlert(`The person '${newName}' was already removed from server.`,"error")
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          triggerAlert(`Added ${personObject.name}.`, "alert")
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          triggerAlert(`Deleted ${name}.`, "alert")
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          triggerAlert(`The person '${name}' was already removed from server.`,"error")
        })
    }
  }

  const triggerAlert = (messageInAlert, typeOfAlert) => {
    setAlertMessageType(typeOfAlert)
    setAlertMessageContent(messageInAlert)
    setTimeout(() => {
      setAlertMessageContent(null)
    }, 4000)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AlertMessage text={alertMessageContent} style={alertMessageType} />
      <FilterForm filterText={filterText} handleFilterChange={handleFilterChange} />
      <SubmitForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonLister persons={persons} filterText={filterText} deletePerson={deletePerson} />
    </div>
  )

}

export default App