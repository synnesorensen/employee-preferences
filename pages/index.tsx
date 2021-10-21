import React, { useState } from "react"
import Link from "next/link"
import RegisteredPersons from "../components/RegisteredPersons"
import styles from "../styles/Home.module.css"

export default function Home() {

  return (
    <>
      <title>Ansattinfo</title>
      <div className={styles.pageLayout}>
        <div className={styles.itemA}>
          <h1>Registrering av opplysninger</h1>
        </div>
        <div className={styles.itemC}>
          <RegisteredPersons />
        </div>
        <div className={styles.itemB}>
          <div className={styles.card}>
            <p>Hvis du ikke ser navnet ditt i listen til høyre kan du registrere deg ved å trykke på knappen.</p>
            <Link href="/form">
              <button type="button" className={styles.button}>
                Registrer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
