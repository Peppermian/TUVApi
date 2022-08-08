import { useState } from 'react'

function App() {
  
  const [certID, setCertID] = useState('')
  const [contact, setContact] = useState([])

  const handleSubmit = (event) => {
    
    event.preventDefault()

<<<<<<< Updated upstream
    fetch("/tuvcert/" + certID)
=======
    fetch("http://localhost:4000/tuvcertificates/system/" + certID)
>>>>>>> Stashed changes
    .then( response => {
      return response.json()
    })
    .then( data => {
      setContact(data.values)
    })

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Search System Certificate ID:
          <input 
            type="text"
            value={certID}
            onChange={ (event) => setCertID(event.target.value) }
          />
        </label>
        <input type="submit" />
      </form>

      <div>
<<<<<<< Updated upstream
        {Array.from(contact).map( elem => {
            return <p> {elem} </p>
=======
        {Array.from(contact).map( (elem, index) => {
            return <p key={index}> {elem} </p>
>>>>>>> Stashed changes
          })}
      </div>

    </div>
  )
}

export default App

