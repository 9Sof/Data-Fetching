import React, { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetailPage = (props) => {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const pid = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((p) => p.id === pid);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const ids = data.products.map((p) => p.id);

  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: false,
  };
};

export default ProductDetailPage;
