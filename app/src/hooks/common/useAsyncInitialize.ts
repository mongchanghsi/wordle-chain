import { useEffect, useState, useCallback } from "react";

export const useAsyncInitialize = <T>(
  func: () => Promise<T>,
  deps: React.DependencyList = []
) => {
  const [state, setState] = useState<T | undefined>();

  const memoizedFunc = useCallback(func, deps);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const result = await memoizedFunc();
      if (isMounted) {
        setState(result);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [memoizedFunc]);

  return state;
};
