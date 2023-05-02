import styles from "../styles/Home.module.css";
import Image from "next/image";
import { formatDistanceToNow, parseJSON } from "date-fns";

interface CommitProps {
  commits: any[];
  loadCommit: boolean;
}

const Commit: React.FC<CommitProps> = ({ commits, loadCommit }) => {
  return (
    <>
      {!loadCommit ? (
        <div className={styles.listaContainer}>
          {!loadCommit && commits?.length > 0 ? (
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
                                {avatar_url ? (
                                  <Image
                                    src={avatar_url}
                                    width={30}
                                    height={30}
                                    alt={author}
                                    priority={true}
                                  />
                                ) : null}
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
          ) : (
            <p className={styles.noCommits}>No commits found</p>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Commit;
