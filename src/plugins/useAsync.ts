import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";

const cache = new Map<string, unknown>();
const emitter = new EventTarget();

const getOrCreate = <T>(key: string, fetcher: () => Promise<T>) => {
  if (cache.has(key)) {
    return cache.get(key) as Promise<T>;
  }
  const value = fetcher();
  cache.set(key, value);
  return value;
};

type MutateFn = () => Promise<void>;
const useAsync = <T>(key: string, fetcher: () => Promise<T>): [T, MutateFn] => {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const initialPromise = useMemo(
    () => getOrCreate(key, fetcherRef.current),
    [key],
  );
  const initialData = use(initialPromise);
  const [data, setData] = useState(initialData);
  const mutate = useCallback(async () => {
    cache.delete(key);
    emitter.dispatchEvent(new Event("revalidate"));
    await getOrCreate(key, fetcherRef.current);
  }, [key]);
  useEffect(() => {
    const update = async () => {
      await getOrCreate(key, fetcherRef.current).then(setData);
    };
    emitter.addEventListener("revalidate", update);
    return () => {
      emitter.removeEventListener("revalidate", update);
    };
  }, [key]);
  return [data, mutate];
};

export default useAsync;
