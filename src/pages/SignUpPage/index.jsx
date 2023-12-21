import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo"
import { useSignUp } from "../../services/auth"
import { SingUpContainer } from "./styled"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [form, setForm ] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const signUp = useSignUp()
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function submitForm(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
     alert("As senhas não coincidem!")
     return;
    }
    delete form.confirmPassword
    axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, form)

      .then(res => {
        console.log(res.data)
      })
      .catch(err => alert(err.message.data))
  }

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
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
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}