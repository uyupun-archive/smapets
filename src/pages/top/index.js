import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.scss";
import { Client } from "../../service/client/client";
import useInterval from "use-interval";
import { Status } from "../../components/status";
import Tomb from "../../assets/images/tombs/tomb.png";
import * as Cat from "../../assets/images/cats/neko";

const Top = () => {
  const [pet, setPet] = useState({});
  const [emotion, setEmotion] = useState(Cat.Neko);
  const [timeoutId, setTimeoutId] = useState();
  const [clickCount, setClickCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const client = new Client();
    if (!client.data.pet.createDatetime) {
      history.push("/setting");
      return;
    }
    setPet(client.data.pet);
  }, [history]);

  useInterval(() => {
    if (pet.hp === 0) {
      return;
    }
    let hp = pet.hp - Math.floor(Math.random() * 10);
    if (hp <= 0) {
      hp = 0;
      const date = new Date();
      pet.deathDatetime = date;

      const tomb = {
        kind: pet.kind,
        name: pet.name,
        createDatetime: pet.createDatetime,
        deathDatetime: date,
      };

      new Client().appendHistory(tomb);
    }

    const update = { ...pet, hp: hp };
    setPet(update);
    new Client().updatePet(update);
  }, 1000);

  const clickPet = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (pet.hp === 0 || pet.hp === pet.maxHP) {
      return;
    }

    let hp = pet.hp + Math.floor(Math.random() * 10);
    if (hp > pet.maxHP) {
      hp = pet.maxHP;
    }
    const update = { ...pet, hp: hp };
    setPet(update);
    new Client().updatePet(update);

    navigator.vibrate(500);

    setClickCount(clickCount + 1);
    if (clickCount >= 5) {
      setEmotion(Cat.NekoDo);
      const timerID = setTimeout(() => {
        setEmotion(Cat.Neko);
        setClickCount(0);
        clearTimeout(timeoutId);
      }, 3000);
      setTimeoutId(timerID);
      return;
    }

    setEmotion(Cat.NekoKi);
    const timerID = setTimeout(() => {
      setEmotion(Cat.Neko);
      setClickCount(0);
    }, 3000);
    setTimeoutId(timerID);
  };

  return (
    <div>
      {Object.keys(pet).length ? (
        <>
          <header className={style.header}>
            <div className={style.header__petName}>{pet.name}</div>
            <div className={style.header__petStatus}>
              <Status ratio={(pet.hp / pet.maxHP) * 100} />
            </div>
            <div className={style.header__petMaxHPBar}>
              <div
                className={style.header__petHPBar}
                style={{ width: pet.hp + "%" }}
              ></div>
            </div>
            <div className={style.header__petHP}>
              {pet.hp}/{pet.maxHP}
            </div>
          </header>
          <main className={style.main}>
            {
              pet.deathDatetime
                ? <div
                  className={style.pet}
                  style={{backgroundImage: `url(${Tomb})`}}
                />
                : <div
                  className={style.pet}
                  onClick={emotion !== Cat.NekoDo ? clickPet : () => {}}
                  style={{backgroundImage: `url(${((pet.hp / pet.maxHP) * 100 < 50) ? Cat.NekoAi : emotion})`}}
                />
            }
          </main>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { Top };
