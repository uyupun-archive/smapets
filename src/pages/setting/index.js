import React, { useState } from "react";
import style from "./style.module.scss";
import { useHistory } from "react-router-dom";
import { Client } from "../../service/client/client";
import { Init as NekoInit } from "../../assets/images/cats/neko";
import { Init as DogInit } from "../../assets/images/dogs/shiba";

const Setting = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    kind: {
      error: false,
    },
    petName: {
      error: false,
    },
  });
  const [imageURL, setImageURL] = useState(DogInit);

  const setError = (key) => {
    errors[key].error = true;
    setErrors(Object.assign({}, errors));
  };

  const validation = (e) => {
    let isError = false;
    if (!e.target.kind.value.trim()) {
      isError = true;
      setError("kind");
    }
    if (!e.target.petName.value.trim()) {
      isError = true;
      setError("petName");
    }
    return isError;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    errors.kind.error = false;
    errors.petName.error = false;
    setErrors(Object.assign({}, errors));

    if (validation(e)) return;
    const client = new Client();
    client.updatePet({
      kind: e.target.kind.value,
      name: e.target.petName.value,
      createDatetime: new Date(),
      deathDatetime: "",
      maxHP: 100,
      hp: 100,
    });
    history.push("/");
  };

  return (
    <div>
      <h1 className={style.title}>ペットを飼う</h1>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.form__container}>
          <label>
            <span>しゅるい</span>
            <select
              className={style.selectbox}
              name={"kind"}
              dafaultvalue={"dog"}
              onChange={(e) => {
                switch (e.target.value) {
                  case "犬":
                    setImageURL(DogInit);
                    break;
                  case "猫":
                    setImageURL(NekoInit);
                    break;
                  default:
                }
              }}
            >
              <option dafaultvalue="dog">犬</option>
              <option dafaultvalue="cat">猫</option>
            </select>
          </label>
          {errors.kind.error && (
            <p className={style.error__message}>選択してください</p>
          )}
        </div>
        <div className={style.form__container}>
          <label>
            <span>おなまえ</span>
            <input className={style.formbox} type="textbox" name="petName" />
          </label>
          {errors.petName.error && (
            <p className={style.error__message}>入力してください</p>
          )}
        </div>
        <div className={style.form__container}>
          <div
            className={style.image}
            style={{ backgroundImage: `url(${imageURL})` }}
          />
        </div>
        <button className={style.settingbtn} type="submit">
          君に決めた！
        </button>
      </form>
    </div>
  );
};

export { Setting };
