import { useState, useEffect } from 'react';

// interface Options {
//     method: string
//     body: string
//     // mode?: string
//     // cache?: string
//     // credentials?: string
//     // headers?: {
//     //     'Content-Type': string
//     // }
//     // redirect?: string
//     // referrerPolicy?: string
// }

export const useFetch = (url: string, options: any) => {
  console.log('useFetch')
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const defaultOptions = {
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData')
      setIsLoading(true);
      try {
        const res = await fetch(url, {...defaultOptions, ...options});
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log('hi')
      }
    };
    fetchData();
  }, []);
  return { response, isLoading, error };
};