import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getContents } from '../src/_api/contents';

export default function  Home({ contents }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Juliano Silva
        </h1>
        <div className={styles.grid}>
        {
          contents.map(function({ title, body, slug }, i) {
            slug = `content/${slug}`;
            return (
              <a href={slug} className={styles.card} key={i}>
                <h3>{ title } &rarr;</h3>
                <p>{ body.length <= 100 ? body : body.substring(0, 100) + '...' }</p>
              </a>
            );
          })
        }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {

  const contents = await getContents();

  if (!contents) {
    return {
      notFound: true,
    }
  }
  return { 
    props: { contents },
    revalidate: 5 * 60
  }
}
