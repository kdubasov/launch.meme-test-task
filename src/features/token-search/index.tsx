import React, {FormEvent, useState} from 'react';
import styles from "./TokenSearch.module.css";
import {useAppDispatch} from "../../store/store";
import {setSearchValue} from "../../store/slices/layout";
import SearchIcon from "../../shared/assets/icons/SearchIcon";

const TokenSearch = () => {
   const [value, setValue] = useState('')
   const dispatch = useAppDispatch()

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch(setSearchValue(value))
   }

   return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
         <label className={styles.slash}>/</label>
         <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={styles.input}
            type="search"
            placeholder="Search for tokens"
         />
         <button className={styles.button} type="submit">
            <span>Find</span>
            <SearchIcon />
         </button>
      </form>
   );
};

export default TokenSearch;