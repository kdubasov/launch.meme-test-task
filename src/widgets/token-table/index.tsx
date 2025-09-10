import styles from "./TokenTable.module.css";
import TokenListItem from "../../features/token-list-item";
import {useAppSelector} from "../../store/store";
import {selectIsTokensLoading, selectSearchValue, selectTokens} from "../../store/slices/layout";

const TokenTable = () => {
   const tokens = useAppSelector(selectTokens)
   const isLoadingTokens = useAppSelector(selectIsTokensLoading)
   const searchValue = useAppSelector(selectSearchValue)

   if (isLoadingTokens || !tokens || tokens.length === 0) {
      return (
         <div className={styles.placeholderWrapper}>
            {
               [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                  <div key={item} className={styles.placeholder} />
               ))
            }
         </div>
      )
   }

   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead>
            <tr>
               <td>Token</td>
               <td>Creator</td>
               <td>Volume</td>
               <td>Market Cap</td>
               <td>Holders</td>
            </tr>
            </thead>
            <tbody>
            {
               tokens
                  .filter((token) => token.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((token) => (
                     <TokenListItem key={token.token} {...token} />
                  ))
            }
            </tbody>
         </table>
      </div>
   );
};

export default TokenTable;