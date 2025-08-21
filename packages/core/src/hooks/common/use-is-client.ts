import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return isClient;
}
