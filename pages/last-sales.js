import React from "react";

import useSWR from "swr";

const LastSalesPage = () => {
  const [sales, setSales] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-501f7-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );

  React.useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   React.useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-501f7-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (!data || !sales) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Failed to load.</h1>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
