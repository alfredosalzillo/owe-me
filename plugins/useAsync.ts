import { use, useCallback, useEffect, useState } from "react";

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

type Revalidate = () => void;
const useAsync = <T>(
  key: string,
  fetcher: () => Promise<T>,
): [T, Revalidate] => {
  const initialData = use(getOrCreate(key, fetcher));
  const [data, setData] = useState(initialData);
  const revalidate = useCallback(() => {
    cache.delete(key);
    emitter.dispatchEvent(new Event("revalidate"));
  }, []);
  useEffect(() => {
    const update = () => {
      getOrCreate(key, fetcher).then(setData);
    }
    emitter.addEventListener("revalidate", update);
    return () => {
      emitter.removeEventListener("revalidate", update);
    };
  }, []);
  return [data, revalidate];
}

export default useAsync;