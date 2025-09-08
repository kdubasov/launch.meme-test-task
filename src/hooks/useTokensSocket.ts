import { useEffect, useRef } from "react";
import { useAppDispatch } from "../store/store";
import { TToken } from "../types/tokens";
import { addToken, setOneToken } from "../store/slices/layout";

const WS_URL = "wss://launch.meme/connection/websocket";
const IDLE_MS = 5000;
const RECONNECT_DELAY_MS = 500;

export const useTokensSocket = () => {
   const dispatch = useAppDispatch();

   const wsRef = useRef<WebSocket | null>(null);
   const idleTimerRef = useRef<number | null>(null);
   const reconnectTimerRef = useRef<number | null>(null);
   const reconnectScheduledRef = useRef(false);
   const unmountedRef = useRef(false);

   useEffect(() => {
      unmountedRef.current = false;

      const clearIdle = () => {
         if (idleTimerRef.current) {
            window.clearTimeout(idleTimerRef.current);
            idleTimerRef.current = null;
         }
      };

      const scheduleIdle = () => {
         clearIdle();
         idleTimerRef.current = window.setTimeout(() => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
               try {
                  wsRef.current.close(4000, "idle-timeout");
               } catch {}
            }
            scheduleReconnect(RECONNECT_DELAY_MS);
         }, IDLE_MS);
      };

      const clearReconnect = () => {
         if (reconnectTimerRef.current) {
            window.clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
         }
         reconnectScheduledRef.current = false;
      };

      const scheduleReconnect = (delay = RECONNECT_DELAY_MS) => {
         if (reconnectScheduledRef.current || unmountedRef.current) return;
         reconnectScheduledRef.current = true;
         reconnectTimerRef.current = window.setTimeout(() => {
            reconnectScheduledRef.current = false;
            connect();
         }, delay);
      };

      const sendAuthAndSubs = (ws: WebSocket) => {
         // 1. connect
         ws.send(
            JSON.stringify({
               connect: {
                  token:
                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE3NTcxNjY4ODh9.VEvlNmvIFS3ARM5R0jlNN4fwDDRz94WnKv8LDmtipNE",
                  name: "js",
               },
               id: 1,
            }),
         );

         // 2. subscribe meteora-mintTokens
         ws.send(
            JSON.stringify({
               subscribe: { channel: "meteora-mintTokens" },
               id: 2,
            }),
         );

         // 3. subscribe meteora-tokenUpdates
         ws.send(
            JSON.stringify({
               subscribe: { channel: "meteora-tokenUpdates" },
               id: 3,
            }),
         );
      };

      const connect = () => {
         // защита от двойных коннектов
         if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

         // чистим таймеры перед новым подключением
         clearIdle();
         clearReconnect();

         const ws = new WebSocket(WS_URL);
         wsRef.current = ws;

         ws.onopen = () => {
            sendAuthAndSubs(ws);
            scheduleIdle(); // стартуем отсчёт тишины
         };

         ws.onmessage = (event) => {
            // любое сообщение — сброс idle-таймера
            scheduleIdle();

            try {
               const parsedData = JSON.parse(event.data);
               const value: Partial<TToken> | undefined = parsedData?.push?.pub?.data;

               if (!value) {
                  throw new Error("Empty data");
               }

               if (parsedData.push?.channel === "meteora-tokenUpdates") {
                  dispatch(setOneToken(value));
               }

               if (parsedData.push?.channel === "meteora-mintTokens") {
                  dispatch(addToken(value as TToken));
               }
            } catch (err) {
               console.log(err);
            }
         };

         ws.onerror = () => {
            // при ошибке просто закрываем — onclose подхватит реконнект
            try {
               ws.close();
            } catch {}
         };

         ws.onclose = () => {
            clearIdle();
            // планируем реконнект, если компонент ещё вмонтирован
            if (!unmountedRef.current) {
               scheduleReconnect();
            }
         };
      };

      connect();

      return () => {
         unmountedRef.current = true;
         clearIdle();
         clearReconnect();
         if (wsRef.current) {
            try {
               wsRef.current.onopen = null;
               wsRef.current.onmessage = null;
               wsRef.current.onclose = null;
               wsRef.current.onerror = null;
               wsRef.current.close(1000, "unmount");
            } catch {}
         }
         wsRef.current = null;
      };
   }, [dispatch]);
};
