import styles from './TokenListItem.module.css'
import type { TToken } from "../../shared/types/tokens";
import { timeAgo, formatNumber } from "./utils";
import {useAppDispatch} from "../../store/store";
import {setActiveToken} from "../../store/slices/layout";

const TokenListItem = (props: TToken) => {
   const {
      name,
      photo,
      holders,
      topHoldersPercentage,
      priceUsd,
      buys,
      marketCapUsd,
      sells,
      website,
      createdAt,
      token,
      creator,
      volumeUsd,
   } = props
   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(setActiveToken(props))
   }

   return (
      <tr className={styles.wrapper} onClick={handleClick}>
         <td className={styles.colMeta}>
            <div className={styles.logo}>
               <img alt={name} src={photo}/>
               <span>{timeAgo(createdAt)}</span>
            </div>
            <div className={styles.creds}>
               <h4>${name}</h4>
               <small>#{token.slice(0, 3)}...{token.slice(-3)}</small>
            </div>
         </td>

         <td className={styles.colCreator}>
            <h4>
               <a href={website}>
                  #{creator.slice(0, 3)}...{creator.slice(-3)}
               </a>
            </h4>
            <a href="#">
               Go to Twitter
            </a>
         </td>

         <td className={styles.colVolume}>
            <h4>${formatNumber(volumeUsd)}</h4>
            <p className={styles.sub}>
               <span>{buys}</span>/<span>{sells}</span>
            </p>
         </td>

         <td className={styles.colMcap}>
            <h4>${formatNumber(marketCapUsd)}</h4>
            <p>${priceUsd.toFixed(5)}</p>
         </td>

         <td className={styles.colHolders}>
            <h4>{holders}</h4>
            <p>{(topHoldersPercentage * 100).toFixed(2)}%</p>
         </td>
      </tr>

   );
};

export default TokenListItem;