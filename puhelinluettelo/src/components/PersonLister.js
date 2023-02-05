import PersonLine from "./PersonLine"

const PersonLister = ({ persons, filterText, deletePerson }) => {
    return (
        <div>
            {persons.filter(word => word.name.toUpperCase().includes(filterText.toUpperCase())).map(person =>
                <div key={person.name}>
                    <PersonLine person={person} deletePerson={deletePerson} />
                </div>
            )}</div>
    )
}

export default PersonLister