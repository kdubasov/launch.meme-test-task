import Modal from "../../shared/ui/modal";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {selectActiveToken, setActiveToken} from "../../store/slices/layout";
import styles from './TokenModal.module.css'
import {formatNumber, timeAgo} from "../../features/token-list-item/utils";

const TokenModal = () => {
   const activeToken = useAppSelector(selectActiveToken);
   const dispatch = useAppDispatch();

   if (!activeToken) {
      return null;
   }

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
   } = activeToken

   const handleClose = () => {
      dispatch(setActiveToken(null))
   }

   return (
      <Modal title="Token info" open onClose={handleClose}>
         <div className={styles.wrapper}>
            <div className={styles.item}>
               <div className={styles.colMeta}>
                  <div className={styles.logo}>
                     <img alt={name} src={photo}/>
                     <span>{timeAgo(createdAt)}</span>
                  </div>
                  <div className={styles.creds}>
                     <h4>${name}</h4>
                     <small>#{token.slice(0, 3)}...{token.slice(-3)}</small>
                  </div>
               </div>
            </div>

            <div className={styles.item}>
               <h4>Creator</h4>
               <div className={styles.colCreator}>
                  <h4>
                     <a href={website}>
                        #{creator.slice(0, 3)}...{creator.slice(-3)}
                     </a>
                  </h4>
                  <a href="#">
                     Go to Twitter
                  </a>
               </div>
            </div>

            <div className={styles.item}>
               <h4>Volume</h4>
               <div className={styles.colVolume}>
                  <h4>${formatNumber(volumeUsd)}</h4>
                  <p className={styles.sub}>
                     <span>{buys}</span>/<span>{sells}</span>
                  </p>
               </div>
            </div>

            <div className={styles.item}>
               <h4>Market Cap </h4>
               <div className={styles.colMcap}>
                  <h4>${formatNumber(marketCapUsd)}</h4>
                  <p>${priceUsd.toFixed(5)}</p>
               </div>
            </div>

            <div className={styles.item}>
               <h4>Holders</h4>
               <div className={styles.colHolders}>
                  <h4>{holders} holders</h4>
                  <p>{(topHoldersPercentage * 100).toFixed(2)}%</p>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default TokenModal;