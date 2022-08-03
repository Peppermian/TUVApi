import { useState } from 'react'

function App() {
  
  const [certID, setCertID] = useState('')
  const [contact, setContact] = useState([])

  const handleSubmit = (event) => {
    
    event.preventDefault()

    fetch("/tuvcert/" + certID)
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
        <label> Enter ISO 27001 certificate ID: 
          <input 
            type="text"
            value={certID}
            onChange={ (event) => setCertID(event.target.value) }
          />
        </label>
        <input type="submit" />
      </form>

      <div>
        {Array.from(contact).map( elem => {
            return <p> {elem} </p>
          })}
      </div>

    </div>
  )
}

export default App

