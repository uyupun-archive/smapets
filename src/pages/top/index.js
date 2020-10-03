import React, { useState } from "react";
import style from "./style.module.scss";
import StatusIcon from "./images/grin-alt-solid1.svg";

const Top = () => {
  const [pet, setPet] = useState({
    name: "いぬ",
    status: 0,
    hp: 80,
    maxHP: 100,
  });

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
      <main className={style.main}>pet</main>
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
