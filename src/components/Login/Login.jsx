import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login () {
  const formInputs = useFormAndValidation({
    email: '',
    password: ''
  })
  return (
    <div className="login">
      <div className="login__header">
        <Header />
      </div>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__form-label">E-mail</label>
        <input className="login__form-input" type="email" name="email" value={formInputs.values.email} onChange={formInputs.handleChange} placeholder="Введите адрес вашей электронной почты" required />
        <span className="login__input-error">{formInputs.errors.email}</span>

        <label className="login__form-label">Пароль</label>
        <input className="login__form-input" type="password" name="password" value={formInputs.values.password} onChange={formInputs.handleChange} placeholder="Введите вам пароль" required />
        <span className="login__input-error">{formInputs.errors.password}</span>

        <span className="login__server-error"></span>
        <button className="login__enter" type="submit">Войти</button>
      </form>
      <p className="login__assumption">Еще не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
    </div>
  )
}

export default Login;
