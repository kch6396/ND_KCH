import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setDate] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setDate(data);
      });
  }, [url]);

  return data;
}
