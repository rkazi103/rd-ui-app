/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import type { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "~/components/Head";

type LoginProps = {
  providers: object;
};

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <>
      <Head description="Login page" />

      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <img
          src="/assets/reddit-logo.png"
          alt="Rddit Logo"
          className="mb-5 w-52"
        />

        {providers &&
          Object.values(providers).map((provider: Provider) => (
            <div key={provider.name}>
              <button
                className="rounded-full bg-orange-500 p-5 text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Login with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
