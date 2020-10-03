import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.scss";
import { Client } from "../../service/client/client";
import useInterval from "use-interval";
import { Status } from "../../components/status";

const Top = () => {
  const [pet, setPet] = useState({});
  const history = useHistory();

  useEffect(() => {
    const client = new Client();
    if (!client.data.dog.createDatetime) {
      history.push("/setting");
      return;
    }
    setPet(client.data.dog);
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
    new Client().updateDog(update);
  }, 1000);

  const clickDog = () => {
    if (pet.hp === 0 || pet.hp === pet.maxHP) {
      return;
    }

    let hp = pet.hp + Math.floor(Math.random() * 10);
    if (hp > pet.maxHP) {
      hp = pet.maxHP;
    }
    const update = { ...pet, hp: hp };
    setPet(update);
    new Client().updateDog(update);

    navigator.vibrate(500);
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
          <main className={style.main} onClick={clickDog}>
            pet
          </main>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { Top };
