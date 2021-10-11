import {
  sanityClient,
  usePreviewSubscription,
} from "../../lib/sanity"
import { GetStaticProps, GetStaticPaths } from 'next'
import { Allergy, Params, Person } from "..//../interfaces"
import styles from "../../styles/Home.module.css"

const query = `*[_type == "person" && slug.current == $slug][0] {
  _id, 
  name,
  slug,
  comment,
  "diet": diet->name,
  allergy[]->{name}
}`

export default function OnePerson({ data } : { data: any }, preview: boolean) {   // TODO: Erstatte any med Person uten at slug knekker
  console.dir(data)
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
          {person.allergy?.map((a: Allergy, i: number) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async(context) => {
  const params = context.params as Params
  const { slug } = params
  const person = await sanityClient.fetch(query, { slug } )
  return { props: { data: { person }, preview: true } }
}
