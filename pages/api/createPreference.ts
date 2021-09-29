import { v4 as uuidv4 } from "uuid"
import sanityClient from "@sanity/client"
import { Allergy } from "../../interfaces"

const config = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-09-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
}

const client = sanityClient(config)

export default async function createPreference(req: any, res: any) {
  const { name, allergy, diet, comment, slug } = JSON.parse(req.body)
  try {
    await client.create({
      _type: "preference",
      name,
      allergy: allergy.map((a: Allergy) => {
        return {
          _type: "reference",
          _ref: a,
          _key: uuidv4()
        }
      }),
      diet: {
        _type: "reference",
        _ref: diet
      },
      comment,
      slug: {
        _type: "slug",
        current: slug
      }
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: `Could not submit preference`, err })
  }
  return res.status(200).json({ message: `Preference submitted` })
}