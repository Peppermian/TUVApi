import { useState } from 'react'

function App() {
  
  const [certID, setCertID] = useState('')
  const [contact, setContact] = useState([])

  const handleSubmit = (event) => {
    
    event.preventDefault()

    fetch("http://localhost:4000/tuvcertificates/system/" + certID)
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
        {Array.from(contact).map( (elem, index) => {
            return <p key={index}> {elem} </p>
          })}
      </div>

    </div>
  )
}

export default App

