import React, { useState } from "react"
import { Layout, LayoutItem } from "@staccx/bento"
import PreferenceForm from "../components/PreferenceForm"
import { getAllergies, getAllRegisteredPreferences, getDiets } from "../lib/api"
import RegisteredPreferences from "../components/RegisteredPreferences"
import styles from "../styles/Home.module.css"

export default function Home({ allergies, diets }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <title>Ansattinfo</title>
      <div className={styles.main}>
        <RegisteredPreferences />
        <PreferenceForm allergies={allergies} diets={diets} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const allergies = await getAllergies()
  const diets = await getDiets()

  return { props: { allergies, diets } }
}
