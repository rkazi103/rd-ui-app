import NextHead from "next/head";

type HeadProps = {
  description: string;
};

const Head = ({ description }: HeadProps) => {
  return (
    <NextHead>
      <title>Reddit Clone</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
    </NextHead>
  );
};

export default Head;
