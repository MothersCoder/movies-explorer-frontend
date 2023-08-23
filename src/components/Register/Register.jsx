import { Link } from "react-router-dom"
import { useState } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register (props) {
/*   const [isError, setError] = useState(false);
  const error = props.error ? true : false;
  setError(error); */

  const formInputs = useFormAndValidation({
    name: '',
    email: '',
    password: ''
  })

  function handleRegisterClick (e) {
    e.preventDefault();
    props.onSubmit(e, formInputs.values)
  }

  return (
    <main className="main">
      <section className="register">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleRegisterClick}>
          <label className="register__label">Имя</label>
          <input className="register__input" type="text" value={formInputs.values.name} onChange={formInputs.handleChange} placeholder="Введите ваше имя" name="name" pattern="^[A-Za-zА-Яа-яЁё\-\s]+$" minLength={2} maxLength={30} required />
          <span className="register__err">{!formInputs.isValid ? formInputs.errors.name : ""}</span>

          <label className="register__label">E-mail</label>
          <input className="register__input" type="email" value={formInputs.values.email} onChange={formInputs.handleChange} placeholder="Введите ваше электронный адрес" name="email" required />
          <span className="register__err">{!formInputs.isValid ? formInputs.errors.email : ""}</span>

          <label className="register__label">Пароль</label>
          <input className={`register__input ${props.error ? 'register__input_err' : ""}`} type="password" value={formInputs.values.password} onChange={formInputs.handleChange} placeholder="Введите ваше пароль" name="password" required />
          <span className="register__err">{props.error ? props.error : ""}</span>

          <button className={`register__button ${!formInputs.isValid ? "register__button_disabled" : ""}`} type="submit" disabled={formInputs.isValid ? false : true}>Зарегистрироваться</button>
        </form>
        <p className="register__assumption">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </section>
    </main>
  )
}

export default Register;
