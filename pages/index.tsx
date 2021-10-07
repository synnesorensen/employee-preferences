import React, { useState } from "react"
import Link from "next/link"
import RegisteredPersons from "../components/RegisteredPersons"
import styles from "../styles/Home.module.css"

export default function Home() {

  return (
    <>
      <title>Ansattinfo</title>
      <div className={styles.container}>
        <h1>Registrering av opplysninger</h1>
        <div className={styles.wrapper}>
          <div className={styles.one}>
          <RegisteredPersons />
          </div>
          <div className={styles.two}>
            <p>Hvis du ikke ser navnet ditt i listen kan du registrer deg ved å trykke på knappen.</p>
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


