import React, { useEffect } from 'react';
import {useGetTokensMutation} from "../../api";
import styles from './TokensList.module.css'
import { useAppDispatch } from "../../store/store";
import {
   setIsTokensLoading,
   setTokens
} from "../../store/slices/layout";
import { useTokensSocket } from "../../shared/hooks/useTokensSocket";
import Navbar from "../../widgets/navbar";
import TokenTable from "../../widgets/token-table";
import TokenModal from "../../widgets/token-modal";

const TokensListPage = () => {
   const [ getTokens ] = useGetTokensMutation()
   const dispatch = useAppDispatch()

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

   return (
      <div className={styles.wrapper}>
         <Navbar />
         <TokenTable />
         <TokenModal />
      </div>
   );
};

export default TokensListPage;