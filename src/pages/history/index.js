import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { Client } from "../../service/client/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const [pet, setPet] = useState({});
  const [histories, setHistories] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const client = new Client();
    setHistories(client.data.history);
    setPet(client.data.pet);
  }, []);

  const dateFormat = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}/${
      newDate.getMonth() + 1
    }/${newDate.getDate()}`;
  };

  const showHistory = () => {
    return histories.map((history, index) => {
      let emoji = "";
      switch (history.kind) {
        case "犬":
          emoji = "🐶";
          break;
        case "猫":
          emoji = "😺";
          break;
        default:
          emoji = "💩";
          break;
      }
      return (
        <Fragment key={index}>
          <div className={style.history}>
            <div>
              {emoji}&nbsp;{history.name}
            </div>
            <div className={style.history__period}>
              {dateFormat(history.createDatetime)} ~{" "}
              {dateFormat(history.deathDatetime)}
            </div>
          </div>
        </Fragment>
      );
    });
  };

  return (
    <div>
      <div className={style.container}>
        <h1 className={style.title}>ペットとの思い出</h1>
        {histories.length ? (
          <>
            <span
              className={style.sort}
              onClick={() => {
                setSort(sort === "asc" ? "desc" : "asc");
                histories.reverse();
                setHistories([...histories]);
              }}
            >
              {sort === "asc" ? (
                <>
                  <span className={style.sort__text}>古い順</span>
                  <FontAwesomeIcon icon={faCaretUp} size={"2x"} />
                </>
              ) : (
                <>
                  <span className={style.sort__text}>新しい順</span>
                  <FontAwesomeIcon icon={faCaretDown} size={"2x"} />
                </>
              )}
            </span>
            {showHistory()}
          </>
        ) : (
          <div className={style.history__not}>
            <p className={style.history__notMessage}>
              過去にペットは飼っていません
            </p>
            {!pet.createDatetime && (
              <Link to={"/setting"} className={style.history__notLink}>
                ペットを飼ってみよう！
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { History };
