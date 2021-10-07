import person from "../../ep-studio/schemas/person"
import {
  sanityClient,
  usePreviewSubscription,
} from "../../lib/sanity"
import styles from "../../styles/Home.module.css"

const query = `*[_type == "person" && slug.current == $slug][0] {
  _id, 
  name,
  slug,
  comment,
  "diet": diet->name,
  allergy[]->{name}
}`

export default function OnePerson({ data, preview }) {
  const { data: person } = usePreviewSubscription(query, {
    params: { slug: data.person?.slug.current },
    initialData: data,
    enabled: preview
  })

  return (
    <div className={styles.card}>
      <h1>Opplysninger for {person.name}</h1>
      <div>
        <p>Allergier </p>
        <ul>
          {person.allergy?.map((a, i) => (
            <li key={i}>{a?.name}</li>
          ))}
        </ul>
        <p>Diett: {person.diet}</p>
        <p>Kommentarer: {person.comment}</p>
      </div>
      <div>
        <button className={styles.button}>Endre</button>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "person" && defined(slug.current)] {
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
  const person = await sanityClient.fetch(query, { slug })
  return { props: { data: { person }, preview: true } }
}
