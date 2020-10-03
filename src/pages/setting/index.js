import React, {useState} from 'react';
import style from './style.module.scss'

const Setting = () => {
  const [errors, setErrors] = useState({
    kind: {
      error: false
    },
    petName: {
      error: false
    },
    userName: {
      error: false
    }
  });

  const setError = (key) => {
    errors[key].error = true;
    setErrors(Object.assign({}, errors));
  };

  const validation = (e) => {
    let isError = false;
    if (!e.target.kind.value.trim()) {
      isError = true;
      setError('kind');
    }
    if (!e.target.petName.value.trim()) {
      isError = true;
      setError('petName');
    }
    if (!e.target.userName.value.trim()) {
      isError = true;
      setError('userName');
    }
    return isError;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validation(e)) {
      console.log('error');
    } else {
      console.log('success');
    }
  }

  return (
    <div >
      <h1 className={style.title}>設定</h1>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.form__container}>
          <label>
            <span>しゅるい</span>
            <select className={style.selectbox} name={"kind"} dafaultvalue={"dog"}>
              <option dafaultvalue="dog">犬</option>
              <option dafaultvalue="cat">猫</option>
            </select>
          </label>
        </div>
        <div className={style.form__container}>
          <label>
            <span>おなまえ</span>
            <input  className={style.formbox} type="textbox" name="petName"/>
          </label> 
        </div>
        <div className={style.form__container}>
          <label>
            <span>飼い主の名前</span>
            <input className={style.formbox} type="textbox" name="userName"/>
          </label>
        </div>
        <button className={style.settingbtn}type="submit">設定する</button>
      </form>
    </div>
  );
}

export { Setting };
