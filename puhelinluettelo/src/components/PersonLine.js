const PersonLine = ({ person, deletePerson }) => {
    return (
        <div>
            {person.name} {person.number}&nbsp;
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
    )
}

export default PersonLine