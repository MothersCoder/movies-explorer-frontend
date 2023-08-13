import { useEffect,  useState } from "react";
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Profile (props) {
  const [isEditableForm, setIsEditableForm] = useState(false);
  const [isServerError, setServerError] = useState(false)
  const formInputs = useFormAndValidation({
    name: '',
    email: ''
  });

  function openEditForm () {
    setIsEditableForm(true)
  };

  function checkServerError () {
    setServerError(true)
  }

  useEffect(() => {
    formInputs.setValues({
      name: props.user.name ?? "",
      email: props.user.email ?? ""
    })
  }, [props.user]);

  return (
    <main className="main">
      <section className="profile">
        <h2 className="profile__title">Привет, {props.user.name}!</h2>
        <form className="profile__form">
          <label className="profile__input-label">
            <p className="profile__label">Имя</p>
            <input className="profile__input" type="text" placeholder="Введите ваше имя" name="name" value={formInputs.values.name} onChange={formInputs.handleChange} disabled={!isEditableForm ? true : false} minLength={2} maxLength={30} required/>
            <span className="profile__input-error">{formInputs.errors.name}</span>
          </label>
          <label className="profile__input-label">
            <p className="profile__label">E-mail</p>
            <input className="profile__input" type="email" placeholder="Ведите адрес электронной почты" name="email" value={formInputs.values.email} onChange={formInputs.handleChange} disabled={!isEditableForm ? true : false} required/>
            <span className="profile__input-error">{formInputs.errors.email}</span>
          </label>
        </form>

        <span className="profile__server-error">{isServerError && 'При обновлении профиля произошла ошибка.'}</span>
        <button  type="submit" className={`profile__save ${isEditableForm && 'profile__save_active'} ${!formInputs.isValid && 'profile__save_disable'} ${isServerError && 'profile__save_disable'}`} disabled={formInputs.isValid ? false : true} onClick={checkServerError}>Сохранить</button>
        <button className={`profile__edit ${isEditableForm && 'profile__edit_hide'}`} onClick={openEditForm}>Редактировать</button>
        <button className={`profile__exit ${isEditableForm && 'profile__exit_hide'}`}>Выйти из аккаунта</button>
      </section>
    </main>
  )
}

export default Profile;
