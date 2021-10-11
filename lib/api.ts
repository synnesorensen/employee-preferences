import { sanityClient } from "./sanity"

export async function getAllRegisteredPersons() {
  const res = await fetch(
    `https://8duvt6tu.api.sanity.io/v2021-09-01/data/query/production?query=*[_type == "person"] {name, slug, diet->{name}, allergy[]->{name}}`
  )
  let persons = await res.json()
  return persons.result
}

export async function getAllergies() {
  const result = await sanityClient.fetch(`*[_type == "allergy"] {_id, name}`)
  return result
}

export async function getDiets() {
  const result = await sanityClient.fetch(`*[_type == "diet"] {_id, name}`)
  return result
}