import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPaw, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className={style.navbar}>
      <ul className={style.list}>
        <li className={style.item}>
          {
            path === '/setting'
              ? <span>
                <FontAwesomeIcon icon={faCog} color={'#ff9b04'}/>
              </span>
              : <Link to={'/setting'}>
                <FontAwesomeIcon icon={faCog} color={'#ff9b04'}/>
              </Link>
          }
        </li>
        <li className={style.item}>
          {
            path === '/'
              ? <span>
                <FontAwesomeIcon icon={faPaw} color={'#ff9b04'}/>
              </span>
              : <Link to={'/'}>
                <FontAwesomeIcon icon={faPaw} color={'#ff9b04'}/>
              </Link>
          }
        </li>
        <li className={style.item}>
          {
            path === 'friends'
              ? <span>
                <FontAwesomeIcon icon={faUserFriends} color={'#ff9b04'}/>
              </span>
              : <Link to={'/'}>
                <FontAwesomeIcon icon={faUserFriends} color={'#ff9b04'}/>
              </Link>
          }
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
