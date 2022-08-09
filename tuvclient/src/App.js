import { useState } from 'react'

function App() {
  
  //string state for ID input field
  const [certID, setCertID] = useState('')

  //string array state for fetched contact info
  const [contact, setContact] = useState([])

  //event handler for submitting id field
  const handleSubmit = (event) => {
    
    event.preventDefault()

    fetch("http://localhost:4000/tuvcertificates/" + encodeURIComponent(certID))
    .then( response => {
      return response.json()
    })
    .then( data => {
      setContact(data.values)
    })

  }

  //application body 
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

