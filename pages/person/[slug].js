import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText
} from "../../lib/sanity"
import styles from "../../styles/Home.module.css"

const query = `*[_type == "preference" && slug.current == $slug][0] {
  _id, 
  name,
  slug,
  comment,
  "diet": diet->name,
  allergy[]->{name}
}`

export default function OnePreference({ data, preview }) {
  const { data: preference } = usePreviewSubscription(query, {
    params: { slug: data.preference?.slug.current },
    initialData: data,
    enabled: preview
  })

  return (
    <div className={styles.card}>
      <h1>Preferanser for {preference.name}</h1>
      <div>
        <p>Allergier </p>
        <ul>
          {preference.allergy?.map((a, i) => (
            <li key={i}>{a?.name}</li>
          ))}
        </ul>
        <p>Diett: {preference.diet}</p>
        <p>Kommentarer: {preference.comment}</p>
      </div>
      <div>
        <button className={styles.button}>Endre</button>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "preference" && defined(slug.current)] {
      "params": {
        "slug": slug.current
      }
    }`
  )
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const preference = await sanityClient.fetch(query, { slug })
  return { props: { data: { preference }, preview: true } }
}
