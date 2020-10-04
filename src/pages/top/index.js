import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.scss";
import { Client } from "../../service/client/client";
import useInterval from "use-interval";
import { Status } from "../../components/status";
import Tomb from "../../assets/images/tombs/tomb.png";
import * as Cat from "../../assets/images/cats/neko";
import * as Dog from "../../assets/images/dogs/shiba";
import useSound from "use-sound";
import d1 from "../../assets/sounds/dog/1.mp3";
import d2 from "../../assets/sounds/dog/2.mp3";
import d3 from "../../assets/sounds/dog/3.mp3";
import d4 from "../../assets/sounds/dog/4.mp3";
import d5 from "../../assets/sounds/dog/5.mp3";

const Top = () => {
  const [pet, setPet] = useState({});
  const [emotion, setEmotion] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [clickCount, setClickCount] = useState(0);
  const [kind, setKind] = useState();
  const history = useHistory();
  const [dog1] = useSound(d1);
  const [dog2] = useSound(d2);
  const [dog3] = useSound(d3);
  const [dog4] = useSound(d4);
  const [dog5] = useSound(d5);

  useEffect(() => {
    const client = new Client();
    if (!client.data.pet.createDatetime) {
      history.push("/setting");
      return;
    }
    setPet(client.data.pet);
    const kind = getPetKind(client.data.pet.kind);
    setKind(kind);
    setEmotion(kind.Init);
  }, [history]);

  const getPetKind = (kind) => {
    let pet;
    switch (kind) {
      case "犬":
        pet = Dog;
        break;
      case "猫":
        pet = Cat;
        break;
      default:
        pet = Dog;
    }
    return pet;
  };

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
      // 死んだ時に鳴く
      [dog1, dog2, dog3, dog4, dog5][Math.floor(Math.random() * 5)]();
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

    // 3秒以内に5回クリック 「怒」
    setClickCount(clickCount + 1);
    if (clickCount >= 5) {
      setEmotion(kind.Do);
      const timerID = setTimeout(() => {
        setEmotion(kind.Init);
        setClickCount(0);
        clearTimeout(timeoutId);
      }, 3000);
      setTimeoutId(timerID);
      return;
    }

    // クリック 「喜」
    setEmotion(kind.Ki);
    const timerID = setTimeout(() => {
      setEmotion(kind.Init);
      setClickCount(0);
    }, 3000);
    setTimeoutId(timerID);

    // サウンド
    [dog1, dog2, dog3, dog4, dog5][Math.floor(Math.random() * 5)]();
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
                style={{
                  width: pet.hp + "%",
                  borderRadius: pet.hp === pet.maxHP ? "5px" : "5px 0 0 5px",
                }}
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
                  onClick={emotion !== kind.Do ? clickPet : () => {}}
                  style={{backgroundImage: `url(${((pet.hp / pet.maxHP) * 100 < 50) ? kind.Ai : emotion})`}}
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
