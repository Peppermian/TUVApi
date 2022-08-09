import { useState } from 'react'

function App() {
  
  //string state for ID input field
  const [certID, setCertID] = useState('')

  //string array state for fetched contact info
  const [contact, setContact] = useState([])

  //string state for scope field
  const [scope, setScope] = useState([])

  //event handler for submitting id field
  const handleSubmit = (event) => {
    
    event.preventDefault()

    fetch("http://localhost:4000/tuvcertificates/" + encodeURIComponent(certID.trim()))
    .then( response => {
      return response.json()
    })
    .then( data => {
      setContact(data.values)
      setScope(data.scope)
    })

  }

  //application body 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Search Product or System Certificate ID:
          <input 
            type="text"
            value={certID}
            onChange={ (event) => setCertID(event.target.value) }
          />
        </label>
        <input type="submit" />
      </form>
      <div>
      <p>-- Contact Information --</p>
        {
          contact ? Array.from(contact).map( (elem, index) => {
                      return <p key={index}> {elem} </p>
                    })
          : null
        }
      <p>-- Scope --</p>
        <p>{scope}</p>
      </div>
    </div>
  )
}

export default App

