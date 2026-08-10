import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";
import Input from "../components/inputs/Input";
import useRepos from "../hooks/useRepos";
import useUser from "../hooks/useUser";
import useBranches from "../hooks/useBranches";
import useCommits from "../hooks/useCommits";
import Dropdown from "../components/inputs/Dropdown";
import Commit from "../components/Commit";
import debounce from "just-debounce-it";
import useData from "../hooks/useData";
import { Toaster } from "react-hot-toast";

const EASE = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden: { y: "115%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

const Home: NextPage = () => {
  const { user, setUser, validateUser, getUserData, loadUser } = useUser();
  const { getUserRepos, repo, setRepo, repos, setRepos, loadRepo } =
    useRepos(user);
  const {
    getRepoBranches,
    branch,
    setBranch,
    branches,
    setBranches,
    loadBranch,
  } = useBranches(user, repo);
  const { getBranchCommits, commits, setCommits, loadCommit } = useCommits(
    user,
    repo,
    branch
  );
  const { getDataCommits, loadData } = useData({
    setUser,
    setRepo,
    setRepos,
    setBranch,
    setBranches,
    setCommits,
  });

  // Use the useEffect hook to set some default values for the user, repo, and branch
  // and then fetch the data for the default data. This will be called only once when
  // the component is mounted.
  useEffect(() => {
    const defaultUser = "wrujel";
    const defaultRepo = "github-history";
    const defaultBranch = "main";
    getDataCommits(defaultUser, defaultRepo, defaultBranch);
  }, []);

  // This code gets the user repos branches and commits
  // This code is used to prevent multiple calls to the API
  const debouncedGetUserRepos = useMemo(
    () =>
      debounce(async (user: string) => {
        if (!validateUser(user)) return;
        const foundUser = await getUserData(user);
        if (foundUser) {
          const resRepo = await getUserRepos(user);
          const resBranch = await getRepoBranches(user, resRepo);
          getBranchCommits(user, resRepo, resBranch);
        } else {
          setRepos([]);
          setBranches([]);
          setCommits([]);
        }
      }, 500),
    []
  );

  // Incremented by every user-driven selection change; Commit uses it
  // to tell a user-triggered list refresh apart from the initial load.
  const [scrollToken, setScrollToken] = useState(0);

  // This function is used to update the user state variable
  // whenever the input field changes. It debounces the call
  // to getUserRepos to avoid making too many API calls.
  const onChangeUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = e.target.value;
    if (newUser.startsWith(" ")) return;
    setUser(newUser);
    setScrollToken((t) => t + 1);
    debouncedGetUserRepos(e.target.value);
  };

  // This function is used to update the repo state variable
  // whenever the dropdown value changes. It also calls the
  // getRepoBranches and getBranchCommits functions to update
  const onChangeRepo = async (newOption: string) => {
    setRepo(newOption);
    setScrollToken((t) => t + 1);
    const res = await getRepoBranches(user, newOption);
    getBranchCommits(user, newOption, res);
  };

  // This function is used to update the branch state variable
  // whenever the dropdown value changes. It also calls the
  // getBranchCommits function to update the commits
  const onChangeBranch = (newOption: string) => {
    setBranch(newOption);
    setScrollToken((t) => t + 1);
    getBranchCommits(user, repo, newOption);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.container}>
        <Head>
          <title>Github History App</title>
          <meta
            name="description"
            content="App that shows you git commit history of a github project"
          />
        </Head>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(13, 17, 23, 0.92)",
              color: "#e6e9f0",
              border: "1px solid rgba(124, 92, 255, 0.35)",
              boxShadow: "0 12px 40px -12px rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(12px)",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "0.82rem",
            },
          }}
        />

        <main className={styles.main}>
          <header className={styles.hero}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                git log --oneline --universe
              </span>
            </motion.div>

            <h1 className={styles.title}>
              <span className={styles.titleLine}>
                <motion.span
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  Github History,
                </motion.span>
              </span>
              <span className={styles.titleLine}>
                <motion.span
                  className={styles.titleGradient}
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  visualized.
                </motion.span>
              </span>
            </h1>

            <motion.p
              className={styles.subtitle}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
            >
              Type any GitHub username and watch a repository unfold as a
              constellation of commits — every node a change, every line a
              story.
            </motion.p>
          </header>

          <motion.section
            className={styles.commandBar}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            <div className={styles.commandBarGrid}>
              <Input
                id="username"
                label="Github username"
                user={user}
                setUser={setUser}
                onChange={onChangeUser}
              />
              <Dropdown
                id="repos"
                label="Repositories"
                disabled={loadUser || loadRepo || loadData}
                data={repos}
                option={repo}
                onChange={onChangeRepo}
              />
              <Dropdown
                id="branches"
                label="Branches"
                disabled={loadUser || loadBranch || loadRepo || loadData}
                data={branches}
                option={branch}
                onChange={onChangeBranch}
              />
            </div>
          </motion.section>

          {loadCommit || loadData ? (
            <Loader />
          ) : (
            <Commit
              key={`${repo}/${branch}`}
              commits={commits}
              loadCommit={
                loadUser || loadCommit || loadRepo || loadBranch || loadData
              }
              scrollToken={scrollToken}
            />
          )}
        </main>
      </div>
    </MotionConfig>
  );
};

export default Home;
