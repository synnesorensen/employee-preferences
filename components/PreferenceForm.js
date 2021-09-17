import { useState } from "react"
import styles from "../styles/Home.module.css"
import { useForm } from "react-hook-form"

export default function PreferenceForm({ allergies, diets }) {
  const [formData, setFormData] = useState()
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" })

  const onSubmit = async (data) => {
    setFormData(data)
    try {
      let response = await fetch("./api/createPreference", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json"
      })
    } catch (err) {
      console.log("An error occurred: ", err)
    }
  }

  return (
    <div className={styles.card}>
      <h1>Registrer dine opplysninger her:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.div}>
          <label>Oppgi ditt navn: </label>
          <input
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
          <input
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
