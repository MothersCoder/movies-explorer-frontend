import { useEffect,  useState } from "react";
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Profile (props) {
  const [isEditableForm, setIsEditableForm] = useState(false);

  const formInputs = useFormAndValidation({
    name: props.user.name,
    email: props.user.email
  });

  useEffect(() => {
    formInputs.setValues({
      name: props.user.name ?? "",
      email: props.user.email ?? ""
    })
  }, [props.user]);

  useEffect(() => {
    if (
      props.user.name === formInputs.values.name &&
      props.user.email === formInputs.values.email
    ) {
      formInputs.setIsvalid(false);
    }
  }, [formInputs.handleChange]);

  useEffect(() => {
    props.clearConfirm();
  }, [formInputs.isValid])

  function openEditForm () {
    setIsEditableForm(true);
  };

  function handleSubmit (e) {
    e.preventDefault();
    formInputs.setIsvalid(false);
    props.updateUserData(e, formInputs.values);
  }

  const serverResponse = () => {
    return props.serverError
      ? props.serverError
      : props.confirm
      ? "Данные успешно обновлены"
      : "";
  };

  const serverResposeType = () => {
    return props.serverError
      ? "profile__server-response_err"
      : props.confirm
      ? "profile__server-response_confirm"
      : "";
  };

  return (
    <main className="main">
      <section className="profile">
        <h2 className="profile__title">Привет, {props.user.name}!</h2>
        <form className="profile__form">
          <label className="profile__input-label">
            <p className="profile__label">Имя</p>
            <input
              className="profile__input"
              type="text"
              placeholder="Введите ваше имя"
              name="name"
              value={formInputs.values.name}
              onChange={formInputs.handleChange}
              disabled={!isEditableForm ? true : false}
              minLength={2}
              maxLength={30}
              required
            />
            <span className="profile__input-error">
              {formInputs.errors.name}
            </span>
          </label>
          <label className="profile__input-label">
            <p className="profile__label">E-mail</p>
            <input
              className="profile__input"
              type="email"
              placeholder="Ведите адрес электронной почты"
              name="email"
              value={formInputs.values.email}
              onChange={formInputs.handleChange}
              disabled={!isEditableForm ? true : false}
              required
            />
            <span className="profile__input-error">
              {formInputs.errors.email}
            </span>
          </label>
        </form>

        <span className={`profile__server-response ${serverResposeType()}`}>
          {serverResponse()}
        </span>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`profile__save ${
            isEditableForm ? "profile__save_active" : ""
          } ${!formInputs.isValid ? "profile__save_disable" : ""} ${
            props.serverError ? "profile__save_disable" : ""
          }`}
          disabled={formInputs.isValid ? false : true}
        >
          Сохранить
        </button>
        <button
          type="button"
          className={`profile__edit ${
            isEditableForm ? "profile__edit_hide" : ""
          }`}
          onClick={openEditForm}
        >
          Редактировать
        </button>
        <button
          type="button"
          className={`profile__exit ${
            isEditableForm ? "profile__exit_hide" : ""
          }`}
          onClick={props.logout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
