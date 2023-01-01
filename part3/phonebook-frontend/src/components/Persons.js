const Persons = ({ persons, filter, delPerson }) => {
    return (
        <div>
            {
                persons.filter(person =>
                    person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                        <p key={person.name}>{person.name} {person.number} <button onClick={() => delPerson(person)} >delete</button></p>
                    )}
        </div>
    )
}

export default Persons;