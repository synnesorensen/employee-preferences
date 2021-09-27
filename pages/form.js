import { useState } from "react"
import styles from "../styles/Home.module.css"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { getAllergies, getDiets } from "../lib/api"
import { v4 as uuidv4 } from "uuid"

export default function PreferenceForm({ allergies, diets }) {
  const [formData, setFormData] = useState()
  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onChange",
    shouldUnregister: false
  })

  const onSubmit = async (data) => {
    setFormData(data)
    data.slug = uuidv4()
    if (!data.allergy) {
      data.allergy = []     // TODO: Find a better way to solve this issue. 
    }
    try {
      await fetch("./api/createPreference", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json"
      })
    } catch (err) {
      console.log("An error occurred: ", err)
    }
    reset()
  }

  return (
    <div className={styles.card}>
      <h1>Registrer dine opplysninger her:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.div}>
          <label>Oppgi ditt navn: </label>
          <NameInput
            className={styles.formInput}
            type="text"
            {...register("name", { required: true })}
          />
        </div>
        <br />
        <div>
          <label>Velg allergier:</label>
          {allergies ? (
            <ul>
              {allergies.map((allergy) => (
                <label key={allergy._id}>
                  <input
                    key={allergy._id}
                    type="checkbox"
                    name={allergy.name}
                    value={allergy._id}
                    checked={allergy[allergy.name]}
                    {...register("allergy")}
                  />
                  {allergy.name}
                  <br />
                </label>
              ))}
            </ul>
          ) : (
            <em>Kunne ikke laste allergier</em>
          )}
        </div>
        <div>
          <label>Velg diett:</label>
          {diets ? (
            <ul>
              {diets.map((diet) => (
                <label key={diet._id}>
                  <input
                    key={diet._id}
                    id={diet._id}
                    type="radio"
                    name="dietSelect"
                    value={diet._id}
                    {...register("diet", { required: true })}
                  />
                  {diet.name}
                  <br />
                </label>
              ))}
            </ul>
          ) : (
            <em>Kunne ikke laste dietter</em>
          )}
        </div>
        <div className={styles.div}>
          <label>Eventuelle kommentarer: </label>
          <CommentInput
            className={styles.formInput}
            type="text"
            {...register("comment")}
          />
        </div>
        {formState.isValid ? (
          <button
            className={styles.button}
            disabled={!formState.isValid}
            type="submit"
          >
            Lagre
          </button>
        ) : (
          <div className={styles.div}>
            <em>Du må fylle ut alle obligatorisk felt.</em>
            <br />
          </div>
        )}
      </form>
    </div>
  )
}

const NameInput = styled.input`
  border: 1px solid rgba(252, 252, 252, 0.4);
  background-color: rgba(252, 252, 252, 0.2);
  width: 250px;
  border-radius: 3px;
  font-family: "Source Sans Pro", sans-serif;
  padding: 8px 10px;
  margin-top: 10px;
  display: block;
  text-align: left;
  font-size: 16px;
  color: white;
  font-weight: 200;
`

const CommentInput = styled.input`
  border: 1px solid rgba(252, 252, 252, 0.4);
  background-color: rgba(252, 252, 252, 0.2);
  width: 350px;
  border-radius: 3px;
  font-family: "Source Sans Pro", sans-serif;
  padding: 8px 10px;
  margin-top: 10px;
  display: block;
  text-align: left;
  font-size: 16px;
  color: white;
  font-weight: 200;
`

export async function getStaticProps() {
  const allergies = await getAllergies()
  const diets = await getDiets()

  return { props: { allergies, diets } }
}