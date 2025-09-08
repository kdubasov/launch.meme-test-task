import React, {useEffect} from 'react';
import {useGetTokensMutation} from "../../api";
import styles from './TokensList.module.css'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {
   selectIsTokensLoading,
   selectSearchValue,
   selectTokens,
   setIsTokensLoading,
   setTokens
} from "../../store/slices/layout";
import TokenListItem from "../../features/token-list-item";
import {useTokensSocket} from "../../hooks/useTokensSocket";
import TokenSearch from "../../features/token-search";

const TokensListPage = () => {
   const [ getTokens ] = useGetTokensMutation()
   const dispatch = useAppDispatch()
   const tokens = useAppSelector(selectTokens)
   const isLoadingTokens = useAppSelector(selectIsTokensLoading)
   const searchValue = useAppSelector(selectSearchValue)

   useTokensSocket()

   useEffect(() => {
      dispatch(setIsTokensLoading(true))
      getTokens({ page: 1 })
         .unwrap()
         .then(res => {
            dispatch(setTokens(res))
         })
         .finally(() => dispatch(setIsTokensLoading(false)))
   }, []);

   if (isLoadingTokens) {
      return <div>'Загрузка...'</div>
   }

   if (!tokens || tokens.length === 0) {
      return <div>'Список токенов пуст!'</div>
   }

   return (
      <div className={styles.wrapper}>
         <TokenSearch />

         <div className={styles.tableWrapper}>
            <table className={styles.table}>
               <thead>
               <tr>
                  <td>TOKEN</td>
                  <td>CA</td>
                  <td>VOLUME</td>
                  <td>MARKET CUP</td>
                  <td>HOLDERS</td>
               </tr>
               </thead>
               <tbody>
               {
                  tokens
                     .filter((token) => token.name.includes(searchValue))
                     .map((token) => (
                     <TokenListItem key={token.token} {...token} />
                  ))
               }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default TokensListPage;