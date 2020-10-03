import React, {useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import { Client } from "../../service/client/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const [pet, setPet] = useState({});
  const [histories, setHistories] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const client = new Client();
    setHistories(client.data.history);
    setPet(client.data.dog)
  }, []);

  const dateFormat = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`;
  };

  const showHistory = () => {
    return histories.map((history, index) => {
      return <Fragment key={index}>
        <div className={style.history}>
          <div>{ history.name }</div>
          <div className={style.history__period}>{ dateFormat(history.createDatetime) } ~ { dateFormat(history.deathDatetime) }</div>
        </div>
      </Fragment>
    });
  };

  return (
    <div>
      <div className={style.container}>
        <h1 className={style.title}>歴代のペット</h1>
        {
          histories.length
            ? <>
              <span className={style.sort} onClick={() => {
                setSort(sort === "asc" ? "desc" : "asc");
                histories.reverse();
                setHistories([...histories]);
              }}>
              {
                sort === "asc"
                  ? <>
                    <span className={style.sort__text}>昇順</span>
                    <FontAwesomeIcon icon={faCaretUp} size={"2x"}/>
                  </>
                  : <>
                    <span className={style.sort__text}>降順</span>
                    <FontAwesomeIcon icon={faCaretDown} size={"2x"}/>
                  </>
              }
              </span>
              {showHistory()}
            </>
            : <div className={style.history__not}>
              <p className={style.history__notMessage}>過去にペットは飼っていません</p>
              {
                !pet.createDatetime
                  && <Link to={"/setting"} className={style.history__notLink}>ペットを飼ってみよう！</Link>
              }
            </div>
        }
      </div>
    </div>
  );
}

export { History };
