import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo"
import useQuickIn from "../../hooks/useQuickIn"
// import useForm from "../../hooks/useForm"
import { useLogin } from "../../services/auth"
import { LoginContainer } from "./styled"
import axios from "axios"
import { useState } from "react"

export default function LoginPage() {
  const [ form, setForm ] = useState({email: "", password: ""})
  //const signUp = useSignUp()
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function submitForm(e) {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/login`, form)
      .then(res => {
        console,log(res.data)
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