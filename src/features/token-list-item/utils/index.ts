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