import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "../styles/Commit.module.css";
import Image from "next/image";
import { formatDistanceToNow, parseJSON } from "date-fns";

interface CommitProps {
  commits: any[];
  loadCommit: boolean;
  scrollToken: number;
}

// Module scope so it survives the remounts caused by repo/branch changes
// (and StrictMode's double effect run in dev). Tracks the scrollToken of
// the last list the view already reacted to.
let lastScrollToken = 0;

const Commit: React.FC<CommitProps> = ({
  commits,
  loadCommit,
  scrollToken,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // The rail "draws" itself with page scroll: 0% at the top of the page,
  // exactly 100% (past the last node) when the page bottom is reached.
  const { scrollYProgress } = useScroll();
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  // Glide the view up to a fresh list only when the change came from a
  // user action (scrollToken bumped by the handlers in index.tsx) — never
  // on the initial page load. Instant jump for reduced-motion users.
  // The token is consumed only when the scroll actually fires, so a
  // cleanup caused by loaders flipping (list swapped for the spinner)
  // doesn't lose it.
  useEffect(() => {
    if (loadCommit || !commits?.length) return;
    if (scrollToken === lastScrollToken) return;
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return; // list is hidden behind the loader; a later run retries
      lastScrollToken = scrollToken;
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [loadCommit, commits, scrollToken]);

  return (
    <>
      {!loadCommit ? (
        <div className={styles.listaContainer} ref={containerRef}>
          {!loadCommit && commits?.length > 0 ? (
            <div className={styles.timeline}>
              <div className={styles.rail}>
                <motion.div
                  className={styles.railProgress}
                  style={{ scaleY: railProgress }}
                />
              </div>
              <ol className={styles.lista}>
                {commits?.map(
                  (
                    {
                      sha,
                      html_url,
                      author,
                      avatar_url,
                      author_url,
                      date,
                      message,
                    }: any,
                    index: number
                  ) => {
                    return (
                      <motion.li
                        className={styles.commit}
                        key={sha}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 20,
                          delay: Math.min(index * 0.05, 0.6),
                        }}
                      >
                        <span className={styles.node}>
                          <span className={styles.nodeCore} />
                        </span>
                        <div className={styles.card}>
                          <div className={styles.cardTop}>
                            <p className={styles.message}>
                              <a className={styles.messageText} href={html_url}>
                                {message}
                              </a>
                            </p>
                            <a
                              className={styles.shaChip}
                              href={html_url}
                              title={sha}
                            >
                              {sha?.slice(0, 7)}
                            </a>
                          </div>
                          <div className={styles.info}>
                            <div className={styles.avatar}>
                              <a
                                className={styles.avatarUser}
                                href={author_url}
                              >
                                {avatar_url ? (
                                  <Image
                                    src={avatar_url}
                                    width={26}
                                    height={26}
                                    alt={author}
                                    priority={true}
                                  />
                                ) : null}
                              </a>
                            </div>
                            <div className={styles.infoText}>
                              <a className={styles.author} href={author_url}>
                                {author}
                              </a>
                              &nbsp;committed&nbsp;
                              <span className={styles.timestamp}>
                                {formatDistanceToNow(parseJSON(date), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    );
                  }
                )}
              </ol>
            </div>
          ) : (
            <p className={styles.noCommits}>No commits found</p>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Commit;
