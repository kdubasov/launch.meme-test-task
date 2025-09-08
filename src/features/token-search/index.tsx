import React, {FormEvent, useState} from 'react';
import styles from "./TokenSearch.module.css";
import {useAppDispatch} from "../../store/store";
import {setSearchValue, setTokens} from "../../store/slices/layout";

const TokenSearch = () => {
   const [value, setValue] = useState('')
   const dispatch = useAppDispatch()

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch(setSearchValue(value))
   }

   return (
      <form className={styles.searchWrapper} onSubmit={handleSubmit}>
         <label htmlFor="q" className={styles.srOnly}>Search</label>
         <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            id="q"
            className={styles.input}
            type="search"
            placeholder="Search tokens…"
         />
         <button className={styles.button} type="submit">
            <span className={styles.buttonIcon} aria-hidden="true">🔍</span>
            Search
         </button>
      </form>
   );
};

export default TokenSearch;