import { Link } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo"
import useQuickIn from "../../hooks/useQuickIn"
import useForm from "../../hooks/useForm"
import { useSignUp } from "../../services/auth"
import { SingUpContainer } from "./styled"

export default function SignUpPage() {
  const { form, handleForm } = useForm({ name: "", email: "", password: "", confirmPassword: "" })
  useQuickIn()
  const signUp = useSignUp()

  function submitForm(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return alert("As senhas não coincidem!")

    delete form.confirmPassword
    signUp(form)
  }

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
        data-test="name"
          required
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
        <input
          data-test="email"
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          data-test="password"
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
          data-test="conf-password"
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
        />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}