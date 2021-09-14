import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { sanityClient } from '../lib/sanity';
import { useForm } from 'react-hook-form';


export default function Home({allergies, diets}) {
  const [formData, setFormData] = useState()
  const { 
    register, 
    handleSubmit,
    formState
  } = useForm({mode: "onChange"});

  const onSubmit = async (data) => {
    setFormData(data)
    try {
      let response = await fetch("./api/handlePref", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json"
      });
    } catch (err) {
      console.log("An error occurred: ", err);
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <h3>Registrer dine opplysninger her:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Oppgi ditt navn: </label>
            <input 
              type="text" 
              {...register("name", { required: true })}
            />
          </div>
          <br />
          <div>
            <label>Velg allergier:</label>
            {allergies ?
              (
              <ul>
                {allergies.map((allergy) => (
                  <label key={allergy._id} >
                    <input 
                      key={allergy._id} 
                      type="checkbox" 
                      name={allergy.name}
                      value={allergy._id}
                      checked={allergy[allergy.name]} 
                      {...register("allergy")}
                    />
                    {allergy.name}<br />
                  </label>
                ))}
              </ul>
              ) : (
                <span>Kunne ikke laste allergier</span>
              )
            }
          </div>
          <div>
            <label>Velg diett:</label>
            {diets ? 
              (
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
                    {diet.name}<br />
                  </label>
                ))}
              </ul>
              ) : (
                <span>Kunne ikke laste dietter</span>
              )
            }
          </div>
          {!formState.isValid && 
          <div>
            <span>Du må fylle ut alle obligatorisk felt.</span>
            <br />
          </div>}
          <div>
            <label>Eventuelle kommentarer: </label>
            <input 
              type="text" 
              {...register("comment")}
            />
          </div>
          <button 
            disabled={!formState.isValid} 
            type="submit"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allergies = await sanityClient.fetch(`*[_type == "allergy"] {_id, name}`)
  const diets = await sanityClient.fetch(`*[_type == "diet"] {_id, name}`)
  return { props: { allergies, diets } }
}