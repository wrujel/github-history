import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export interface IData {
  name: string,
  avatar_url: string,
  html_url: string,
  repos: [],
  branches: [],
  commits: [],
}

const Home: NextPage = () => {
  const [user, setUser] = useState("wrujel");
  const [repo, setRepo] = useState("github-history");
  const [branch, setBranch] = useState("main");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    getData().then((res) => {
      if (res) {
        setLoading(false);
      } else {
        alert("No se pudo establecer conexion con el servidor.");
      }
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  async function getData() {
    return await fetch("http://localhost:8080/api/data", {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo, branch: branch }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

      {loading ? (
        <main>Loading...</main>
      ) : (
        <main className={styles.main}>
          <h1 className={styles.title}>Github History App</h1>

          <div>
            <ol>
              {
                data?.commits.map(({sha, author, date, message}: any) => {
                  return <li key={sha}>{message}</li>
                })
              }
            </ol>
          </div>
        </main>
      )}
    </div>
  );
}

export default Home
