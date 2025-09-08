import styles from './TokenListItem.module.css'
import {TToken} from "../../types/tokens";
import {timeAgo} from "./utils";

const TokenListItem = (props: TToken) => {
   const { name, photo, holders, topHoldersPercentage, description, priceUsd, buys, marketCapUsd, sells, telegram, website, x, createdAt, token, creator, volumeUsd } = props

   return (
      <tr className={styles.wrapper}>
         <td className={styles.colMeta}>
            <img className={styles.avatar} alt={name} src={photo}/>
            <span className={styles.time}>{timeAgo(createdAt)}</span>
         </td>

         <td className={styles.colInfo}>
            <div className={styles.nameWrapper}>
               <h4 className={styles.name}>{name}</h4>
               <div className={styles.social}>
                  {telegram && (
                     <a className={styles.socialLink} href={telegram} target="_blank" rel="noopener noreferrer">
                        TG
                     </a>
                  )}
                  {x && (
                     <a className={styles.socialLink} href={x} target="_blank" rel="noopener noreferrer">
                        X
                     </a>
                  )}
               </div>
            </div>
            {description && <small className={styles.desc}>{description}</small>}
         </td>

         <td className={styles.colToken}>
            <p className={styles.tokenLine}>
               <code className={styles.tokenMono}>{token}</code>
               <button className={styles.copyBtn}>copy</button>
            </p>
            {creator && (
               <small className={styles.muted}>
                  by{" "}
                  <a className={styles.link} href={website || "#"} target="_blank" rel="noopener noreferrer">
                     {creator.slice(0,3)}...{creator.slice(-3)}
                  </a>
               </small>
            )}
         </td>

         <td className={styles.colNum}>
            <div className={styles.value}>${volumeUsd.toFixed()}</div>
            <div className={styles.sub}>
               {buys}/{sells}
            </div>
         </td>

         <td className={styles.colNum}>
            <div className={styles.value}>${marketCapUsd.toFixed()}</div>
            <div className={styles.sub}>${priceUsd}</div>
         </td>

         <td className={styles.colNum}>
            <div className={styles.value}>{holders}</div>
            <div className={styles.sub}>TOP: {(topHoldersPercentage * 100).toFixed(2)}%</div>
         </td>
      </tr>

   );
};

export default TokenListItem;