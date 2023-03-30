import { useState } from 'react'
import { Form } from '../../components/form'
import { TextField } from '../../components/text-field'
// import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
  // const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch('http://localhost:2000/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
        // setSuccess(true)
        navigate('/')
      })
  }

  return (
    <Form 
      title="Log in"
      onSubmit={handleSubmit}
      linkUnder={{ path: '/auth/signup', text: 'Go to sign up' }}
    >
      <TextField
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
      />

      {/* {success && <Navigate to="/" />} */}
    </Form>
  )
}