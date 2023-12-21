import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo"
import { LoginContainer } from "./styled"
import axios from "axios"
import { useContext, useState } from "react"
import AuthContext from "../../contexts/AuthContext"

export default function LoginPage() {
  const {setToken, setUsername} = useContext(AuthContext)
  const [ form, setForm ] = useState({email: "", password: ""})
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function submitForm(e) {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/login`, form)
      .then(res => {
        console.log(res.data)
        setToken(res.data.token)
        setUsername(res.data.userName)
        navigate("/home")
      })
      .catch(err => alert(err.message.data))
  }


  return (
    <LoginContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </LoginContainer>
  )
}