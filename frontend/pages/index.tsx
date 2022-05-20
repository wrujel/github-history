import { formatDistanceToNow, parseJSON } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Home Page
 * render by default
 *
 */
const Home: NextPage = () => {
  const [user, setUser] = useState("wrujel");
  const [repo, setRepo] = useState("github-history");
  const [repos, setRepos] = useState([]);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadCommit, setLoadCommit] = useState(false);
  const [loadRepo, setLoadRepo] = useState(false);
  const [loadBranch, setLoadBranch] = useState(false);
  const [loadBranches, setLoadBranches] = useState(false);
  const [loadData, setLoadData] = useState(false);

  /**
   * This function get all data on first render
   *
   */
  useEffect(() => {
    getData().then((res) => {
      if (res.info === "succeed") {
        setRepos(res.repos);
        setBranches(res.branches);
        setCommits(res.commits);
        setLoading(false);
      } else {
        alert("No se pudo establecer conexion con el servidor.");
      }
    });
  }, []);

  /**
   * Rerender page everytime there is a change in
   * repositories, branches and commits
   *
   */
  useEffect(() => {}, [repos, branches, commits]);

  /**
   * Rerender page and get commits from server
   * every 5000 ms = 5 seconds
   *
   */
  useEffect(() => {
    const interval = setInterval(() => {
      getCommits().then((res) => {
        if (res.info === "succeed") {
          setCommits(res.commits);
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [commits]);

  /**
   * Rerender page when loadRepo change and
   * get repositories if true
   *
   * @param loadRepo flag to load new repositories
   */
  useEffect(() => {
    if (loadRepo === true) {
      clsValues();
      getRepos().then((res) => {
        if (res.info === "succeed") {
          setRepos(res.repos);
          setRepo(res.repos[0]);
          setLoadRepo(false);
          setLoadBranches(true);
        }
      });
    }
  }, [loadRepo]);

  /**
   * Rerender page when loadBranches change and
   * get branches if true
   *
   * @param loadBranches flag to load new branches
   */
  useEffect(() => {
    if (loadBranches === true) {
      getBranches().then((res) => {
        if (res.info === "succeed") {
          setBranches(res.branches);
          setBranch(res.branches[0]);
          setLoadBranch(false);
          setLoadBranches(false);
          setLoadData(true);
        }
      });
    }
  }, [loadBranches]);

  /**
   * Rerender page when loadData change and
   * get commits if true
   *
   * @param loadData flag to load new commits
   */
  useEffect(() => {
    if (loadData === true) {
      getCommits().then((res) => {
        if (res.info === "succeed") {
          setCommits(res.commits);
          setLoadData(false);
          setLoadCommit(false);
        }
      });
    }
  }, [loadData]);

  /**
   * This function fecth all data from server:
   * repositories, branches and commits
   *
   * @param user github username
   * @param repo github repository
   * @param branch github branch
   * @returns a json with all data
   */
  async function getData() {
    return await fetch(`${serverUrl}/api/data`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo, branch: branch }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Function that fetch repositories data from server
   *
   * @param user github username
   * @returns an array with all repositories of a user
   */
  async function getRepos() {
    return await fetch(`${serverUrl}/api/repos`, {
      method: "POST",
      body: JSON.stringify({ user: user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        alert("No se encontraron repositorios.");
        console.log(err);
      });
  }

  /**
   * Function that fecth branches data from server
   *
   * @param user github username
   * @param repo github repository
   * @returns an array with all branches of a repository
   */
  async function getBranches() {
    return await fetch(`${serverUrl}/api/branches`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        alert("No se encontraron branches.");
        console.log(err);
      });
  }

  /**
   * Function that fecth commits data from server
   *
   * @param user github username
   * @param repo github repository
   * @param branch github branch
   * @returns a json with all commits of branch
   */
  async function getCommits() {
    return await fetch(`${serverUrl}/api/commits`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo, branch: branch }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Function that clean repositories, branches
   * and commits variables
   *
   */
  function clsValues() {
    setBranch("");
    setRepo("");
    setRepos([]);
    setBranches([]);
    setCommits([]);
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
        <main className={styles["section-center-loading"]}>
          <div className={styles["sk-chase"]}>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
          </div>
        </main>
      ) : (
        <main className={styles.main}>
          <h1 className={styles.title}>Github History App</h1>

          <div className={`flex -mx-3 mb-2 mt-6 `}>
            <div className={`w-full px-3 mb-6 md:mb-0 `}>
              <label
                className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${styles.label}`}
                htmlFor="grid-city"
              >
                GITHUB USERNAME
              </label>
              <form
                className={styles.searchContainer}
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoadCommit(true);
                  setLoadBranch(true);
                  setLoadRepo(true);
                }}
              >
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${styles.inputQuery}`}
                  id="grid-city"
                  type="text"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                  disabled={loadCommit}
                />
                <button type="submit" className={styles.searchButton}>
                  <svg
                    className={`w-6 h-6 ${styles.icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>

            {!loadRepo ? (
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${styles.label}`}
                  htmlFor="grid-state"
                >
                  REPOSITORIES
                </label>
                <div className={styles.searchContainer}>
                  <select
                    className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 
                              pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${styles.inputQuery}`}
                    id="grid-state"
                    value={repo}
                    onChange={(e) => {
                      setRepo(e.target.value);
                      setLoadCommit(true);
                      setLoadBranch(true);
                      setLoadBranches(true);
                    }}
                    disabled={loadCommit}
                  >
                    {repos?.map((repo: string) => {
                      return (
                        <option key={repo} value={repo}>
                          {repo}
                        </option>
                      );
                    })}
                  </select>

                  <div
                    className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${styles.arrow}`}
                  >
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {!loadBranch ? (
              <div className={`w-full px-3 mb-6 md:mb-0`}>
                <label
                  className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${styles.label}`}
                  htmlFor="grid-zip"
                >
                  BRANCHES
                </label>
                <div className={styles.searchContainer}>
                  <select
                    className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 
                              pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${styles.inputQuery}`}
                    id="grid-state"
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      setLoadCommit(true);
                      setLoadData(true);
                    }}
                    disabled={loadCommit}
                  >
                    {branches?.map((branch: string) => {
                      return (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      );
                    })}
                  </select>

                  <div
                    className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${styles.arrow}`}
                  >
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {!loadCommit ? (
            <div className={styles.listaContainer}>
              <ol className={styles.lista}>
                {commits?.map(
                  ({
                    sha,
                    html_url,
                    author,
                    avatar_url,
                    author_url,
                    date,
                    message,
                  }: any) => {
                    return (
                      <li className={styles.commit} key={sha}>
                        <div className={styles.details}>
                          <p className={styles.message}>
                            <a className={styles.messageText} href={html_url}>
                              {message}
                            </a>
                          </p>
                          <div className={styles.info}>
                            <div className={styles.avatar}>
                              <div className={styles.avatarBody}>
                                <a
                                  className={styles.avatarUser}
                                  href={author_url}
                                >
                                  <Image
                                    src={avatar_url}
                                    width={30}
                                    height={30}
                                    alt={author}
                                  ></Image>
                                </a>
                              </div>
                            </div>
                            <div className={styles.infoText}>
                              <a className={styles.author} href={author_url}>
                                {author}
                              </a>
                              &nbsp;committed&nbsp;
                              <span className={styles.date}>
                                {formatDistanceToNow(parseJSON(date), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }
                )}
              </ol>
            </div>
          ) : (
            <div className={styles.listaContainer}>
              <div className={styles["sk-chase"]} data-visible={!loadCommit}>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Home;
