import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";
import Input from "../components/inputs/Input";
import useRepos from "../hooks/useRepos";
import useUser from "../hooks/useUser";
import useBranches from "../hooks/useBranches";
import useCommits from "../hooks/useCommits";
import Select from "../components/inputs/Select";
import Commit from "../components/Commit";
import debounce from "just-debounce-it";
import useData from "../hooks/useData";
import { Toaster } from "react-hot-toast";

const Home: NextPage = () => {
  const { user, setUser } = useUser();
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
        const resRepo = await getUserRepos(user);
        const resBranch = await getRepoBranches(user, resRepo);
        getBranchCommits(user, resRepo, resBranch);
      }, 500),
    []
  );

  // This function is used to update the user state variable
  // whenever the input field changes. It debounces the call
  // to getUserRepos to avoid making too many API calls.
  const onChangeUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = e.target.value;
    if (newUser.startsWith(" ")) return;
    setUser(newUser);
    debouncedGetUserRepos(e.target.value);
  };

  // This function is used to update the repo state variable
  // whenever the select field changes. It also calls the
  // getRepoBranches and getBranchCommits functions to update
  const onChangeRepo = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setRepo(newOption);
    const res = await getRepoBranches(user, newOption);
    getBranchCommits(user, newOption, res);
  };

  // This function is used to update the branch state variable
  // whenever the select field changes. It also calls the
  // getBranchCommits function to update the commits
  const onChangeBranch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setBranch(newOption);
    getBranchCommits(user, repo, newOption);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Github History App</title>
        <meta
          name="description"
          content="App that shows you git commit history of a github project"
        />
      </Head>
      <Toaster />

      <main className={styles.main}>
        <h1 className={styles.title}>Github History App</h1>
        <div
          className="
          mx-3 
          mb-2 
          mt-6
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-3
        "
        >
          <Input
            id="username"
            label="GITHUB USERNAME"
            user={user}
            setUser={setUser}
            onChange={onChangeUser}
          />
          <Select
            id="repos"
            label="REPOSITORIES"
            disabled={loadRepo || loadData}
            data={repos}
            option={repo}
            onChange={onChangeRepo}
          />
          <Select
            id="branches"
            label="BRANCHES"
            disabled={loadBranch || loadRepo || loadData}
            data={branches}
            option={branch}
            onChange={onChangeBranch}
          />
        </div>
        {loadCommit || loadData ? (
          <Loader />
        ) : (
          <Commit
            commits={commits}
            loadCommit={loadCommit || loadRepo || loadBranch || loadData}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
