export function timeAgo(dateStr: string): string {
   const now = Date.now();
   const date = new Date(dateStr).getTime();
   const diffMs = now - date;

   const seconds = Math.floor(diffMs / 1000);
   if (seconds < 60) {
      return `${seconds || 5}s ago`;
   }

   const minutes = Math.floor(seconds / 60);
   return `${minutes || 1}m ago`;
}

export function formatNumber(num: number): string {
   if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
   }
   if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
   }
   return num.toFixed(2);
}
