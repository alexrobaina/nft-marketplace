import BaseText from 'components/common/BaseText';
import Card from 'components/NftCard';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

import content from '../content/meta.json';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const { data: session }: any = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>DApp test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BaseText size={50} bold text="Nft galery" marginTop={30} marginBottom={30} />
        <BaseText
          size={14}
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
          marginTop={20}
          marginBottom={30}
        />
        <div className={styles.collectionContainer}>
          {content.map((nft) => {
            return (
              <Card
                key={nft.name}
                marginTop={30}
                name={nft.name}
                image={nft.image}
                category={nft.category}
                description={nft.description}
                price={nft.attributes[2].value}
              />
            );
          })}
        </div>
        {session && (
          <>
            Signed in as {session?.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn('github')}>Sign in with github</button>
            <button onClick={() => signIn('facebook')}>Sign in with facebook</button>
            <button onClick={() => signIn('google')}>Sign in with google</button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
