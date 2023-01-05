import { useEffect, useState } from "react"
import { initData, submitData } from "../services/fetch-api";

export default function Form () {
  const [occupations, setOccupations] = useState(['']);
  const [states, setStates] = useState(['']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function init () {
      try {
        const fetchData = await initData()
        setOccupations([...fetchData.occupations]);
        setStates([...fetchData.stateInitials])
      } catch (e) {
        console.log(e)
      }
    }
    init()
  }, [])
  
  function handleChange (event) {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  async function handleSubmit (event) {
    event.preventDefault();
    // If either error or success message is being displayed, this clears it
    setError(false);
    setSuccess(false);
    try {
      const response = await submitData(formData);
      if (response) {
        setSuccess(true);
        event.target.reset();
      } else {
        setError(true)
      }
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }
  
  return (
    <div className="form">
        <form onSubmit={handleSubmit}>
          <p>
            <input type="text" placeholder="Full Name" required name="name" onChange={handleChange}/>
          </p>
          <p>
            <input type="email" placeholder="Email" required name="email" onChange={handleChange}/>
          </p>
          <p>
            <input type="password" placeholder="Password" required name="password" onChange={handleChange}/>
          </p>
          <p>
            <select onChange={handleChange} required name="occupation" defaultValue="">
              <option value="" key="noOccupation" disabled >Occupation</option>
              {occupations.map((occupation, index) => <option key={`occupation-${index}`} value={occupation}>{occupation}</option>)}
            </select>
          </p>
          <p>
            <select onChange={handleChange} required name="state" defaultValue="">
              <option value="" key="noState" disabled >State</option>
              {states.map((state, index) => <option key={`state-${index}`} value={state}>{state}</option>)}
            </select>
          </p>
          <button type="submit">Submit</button>
        </form>
        {success && <h2>Submitted</h2>}
        {error && <h2>Error. Try again.</h2>}
    </div>
  );
}