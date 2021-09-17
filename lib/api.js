import { sanityClient } from "../lib/sanity"

export async function getAllRegisteredPreferences() {
  const res = await fetch(
    `https://8duvt6tu.api.sanity.io/v2021-09-01/data/query/production?query=*[_type == "preference"] {name, slug, diet->{name}, allergy[]->{name}}`
  )
  let prefs = await res.json()
  return prefs.result
}

export async function getAllergies() {
  const result = await sanityClient.fetch(`*[_type == "allergy"] {_id, name}`)
  return result
}

export async function getDiets() {
  const result = await sanityClient.fetch(`*[_type == "diet"] {_id, name}`)
  return result
}

export async function getPersonWithSlug({ params }) {
  const { slug } = params
  const person = await sanityClient.fetch(
    `*[_type == "preference" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    allergy[] {
      _key,
      allergy->{
        name
      }
    },
    diet,
    comment
  }`,
    { slug }
  )
  return person
}

export async function getPersonPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "preference" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  )
  return paths
}
