import { Link } from "react-router-dom"
import { useState } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register () {
  const formInputs = useFormAndValidation({
    name: '',
    email: ''
  })
  const [isError, setError] = useState(false)

  function showError (e) {
    e.preventDefault();
    setError(true);
  }
  return (
    <main className="main">
      <section className="register">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={showError}>
          <label className="register__label">Имя</label>
          <input className="register__input" type="text" value={formInputs.values.name} onChange={formInputs.handleChange} placeholder="Введите ваше имя" name="name" minLength={2} maxLength={30} required />
          <span className="register__err">{!formInputs.isValid ? formInputs.errors.name : null}</span>

          <label className="register__label">E-mail</label>
          <input className="register__input" type="email" value={formInputs.values.email} onChange={formInputs.handleChange} placeholder="Введите ваше электронный адрес" name="email" required />
          <span className="register__err">{!formInputs.isValid ? formInputs.errors.email : null}</span>

          <label className="register__label">Пароль</label>
          <input className={`register__input ${isError ? 'register__input_err' : null}`} type="password" placeholder="Введите ваше пароль" name="password" required />
          <span className="register__err">{isError ? 'Что-то пошло не так...' : null}</span>

          <button className="register__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__assumption">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </section>
    </main>
  )
}

export default Register;
