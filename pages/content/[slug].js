import { getContent } from "../../src/_api/content/slug";
import { getContents } from "../../src/_api/contents";
import styles from '../../styles/Content.module.css';
import { useRouter } from 'next/router'



export default function Content({content}) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
      <main className={styles.main}>
          <div className={styles.grid}>
              <div className={styles.card}>
                  <h3>{  content.title } &rarr;</h3>
                  <p>{ content.body }</p>
              </div>
          </div>
    </main>
  )
}

export async function getStaticPaths() {

    const contents = await getContents();

    const paths = contents.map(({ slug }, id) => {
        return { params: { slug }}
    });

    return {
      paths,
      fallback: true,
    }
}

export async function getStaticProps({ params }) {

    const content = await getContent(params.slug);

    if (!content) {
      return {
        notFound: true,
      }
    }
    return { 
      props: { content }
    }
  }
  