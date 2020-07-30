import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { useState, useEffect } from "react";
import axios from "axios";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [oi, setOi] = useState(1);
  const [github, setGithub] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/AlexandreZelante")
      .then((response) => {
        console.log(response.data);
        setGithub(response.data);
      });
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <button onClick={() => setOi(oi + 1)}>Clica</button>
        <h1>{oi}</h1>

        {github && <h1>{github.login}</h1>}

        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
