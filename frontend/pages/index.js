import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Github History App</title>
        <meta
          name="description"
          content="An app that shows you git commit history of a github project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>

        <p className={styles.description}>Get started</p>
      </main>
    </div>
  );
}
