import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login (props) {
  const formInputs = useFormAndValidation({
    email: '',
    password: ''
  })

  function handleSubitClick (e) {
    e.preventDefault();
    props.onSubmit(e, formInputs.values);
  }

  return (
    <main className="main">
      <section className="login">
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit = {handleSubitClick}>
          <label className="login__form-label">E-mail</label>
          <input className="login__form-input" type="email" name="email" value={formInputs.values.email} onChange={formInputs.handleChange} placeholder="Введите адрес вашей электронной почты" required />
          <span className="login__input-error">{formInputs.errors.email}</span>

          <label className="login__form-label">Пароль</label>
          <input className="login__form-input" type="password" name="password" value={formInputs.values.password} onChange={formInputs.handleChange} placeholder="Введите ваш пароль" required />
          <span className="login__input-error">{formInputs.errors.password}</span>

          <span className="login__server-error">{props.error}</span>
          <button type="submit" className="login__enter" >Войти</button>
        </form>
        <p className="login__assumption">Еще не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
      </section>
    </main>
  )
}

export default Login;
