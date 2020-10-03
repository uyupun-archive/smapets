import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import StatusIcon from "./images/grin-alt-solid1.svg";
import { Client } from "../../service/client/client";
import useInterval from "use-interval";

const Top = () => {
  const [pet, setPet] = useState({});

  useEffect(() => {
    const client = new Client();
    setPet(client.data.dog);
  }, []);

  useInterval(() => {
    if (pet.hp === 0) {
      return;
    }
    let hp = pet.hp - Math.floor(Math.random() * 10);
    if (hp < 0) {
      hp = 0;
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
  };

  return (
    <div>
      <header className={style.header}>
        <div className={style.header__petName}>{pet.name}</div>
        <div className={style.header__petStatus}>
          <Status status={pet.status} />
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
    </div>
  );
};

export { Top };

const Status = (props) => {
  switch (props.status) {
    case 0:
      return <img src={StatusIcon} />;
  }
  return <>noimage</>;
};
