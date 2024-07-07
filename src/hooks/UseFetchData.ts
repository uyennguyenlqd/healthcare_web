import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const useFetchData = (url: string) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${session?.user.token}` },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        setData(result.data);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    loading,
  };
};
export default useFetchData;
