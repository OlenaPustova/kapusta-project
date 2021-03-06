import { useDispatch } from 'react-redux/es/exports';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import sprite from '../../../assets/images/symbol-defs.svg';
import { getTransactionsPerPeriod } from '../../../redux/reports/reportsOperations';
import { months, dateNow, getMonth } from './DataOptions';
import s from './Data.module.scss';
import { useNavigate } from 'react-router-dom';
import authSelectors from '../../../redux/auth/authSelectors';
import { langOpts } from '../../../utils/function/translateBackEndResp';

const Data = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [month, setMonth] = useState(() => getMonth(dateNow.getMonth()));
  const [year, setYear] = useState(() => dateNow.getFullYear());
  const token = useSelector(authSelectors.getToken);

  const handleDecrementMonth = () => {
    dateNow.setMonth(dateNow.getMonth() - 1);
    if (month === 'Январь') {
      setYear(dateNow.getFullYear());
    }
    return setMonth(getMonth(dateNow.getMonth()));
  };
  const handleIncrementMonth = () => {
    dateNow.setMonth(dateNow.getMonth() + 1);
    if (month === 'Декабрь') {
      setYear(dateNow.getFullYear());
    }
    return setMonth(getMonth(dateNow.getMonth()));
  };

  useEffect(() => {
    dispatch(
      getTransactionsPerPeriod(
        `${year}-${String(months.indexOf(month) + 1).padStart(2, '0')}`
      )
    );
    navigate({
      search: 'type=&category=',
    });
    //eslint-disable-next-line
  }, [dispatch, month, year]);

  useEffect(() => {
    if (token.length > 0) {
      dispatch(
        getTransactionsPerPeriod(
          `${year}-${String(months.indexOf(month) + 1).padStart(2, '0')}`
        )
      );
    }
    //eslint-disable-next-line
  }, [token]);

  return (
    <div className={s.wrapp}>
      <p className={s.descr}>Поточний період:</p>
      <div className={s.date}>
        <button
          className={s.button}
          type="button"
          onClick={handleDecrementMonth}
        >
          <svg width="4" height="10">
            <use href={sprite + '#left'} />
          </svg>
        </button>
        <p className={s.currentDate}>
          <span className={s.month}>{langOpts[month].ua}</span>
          <span className={s.year}>{year}</span>
        </p>
        <button
          className={s.button}
          type="button"
          onClick={handleIncrementMonth}
        >
          <svg width="4" height="10">
            <use href={sprite + '#right'} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Data;
