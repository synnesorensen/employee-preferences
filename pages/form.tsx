import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { getAllergies, getDiets } from "../lib/api";
import { v4 as uuidv4 } from "uuid";
import { Allergies, Diet } from "../interfaces";

export default function Form({
  allergies,
  diets,
}: {
  allergies: Allergies;
  diets: Diet[];
}) {
  type FormValues = {
    name: string;
    allergy: Allergies;
    diet: Diet;
    comment: string;
    slug: string;
  };

  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  const onSubmit = async (data: FormValues) => {
    data.slug = uuidv4();
    if (!data.allergy) {
      data.allergy = [];
    }
    try {
      await fetch("./api/createPerson", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log("An error occurred: ", err);
    }
    reset();
  };

  return (
    <>
      <div className={styles.centerForm}>
        <h1>Registrering av opplysninger</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.comment}>
            <h2>Oppgi ditt navn: </h2>
            <NameInput
              className={styles.formInput}
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <br />
          <div>
            <h2>Velg allergier:</h2>
            {allergies ? (
              <ul>
                {allergies.map((allergy) => (
                  <label key={allergy._id}>
                    <input
                      key={allergy._id}
                      type="checkbox"
                      value={allergy._id}
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
            <h2>Velg diett:</h2>
            {diets ? (
              <ul>
                {diets.map((diet) => (
                  <label key={diet._id}>
                    <input
                      key={diet._id}
                      id={diet._id}
                      type="radio"
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
          <div className={styles.comment}>
            <label>
              Allergi eller diett som ikke er p?? listen eller andre kommentarer:{" "}
            </label>
            <CommentInput
              className={styles.formInput}
              type="text"
              {...register("comment")}
            />
          </div>
          {!formState.isValid && (
            <div className={styles.comment}>
              <em>Du m?? fylle ut navn og velge diett.</em>
              <br />
            </div>
          )}
          <Link href="/">
            <button type="button" className={styles.button}>
              Tilbake
            </button>
          </Link>
          <button
            className={styles.button}
            disabled={!formState.isValid}
            type="submit"
          >
            Lagre
          </button>
        </form>
      </div>
    </>
  );
}

const NameInput = styled.input`
  border: 1px solid rgba(252, 252, 252, 0.4);
  background-color: rgba(252, 252, 252, 0.2);
  width: 100%;
  border-radius: 3px;
  font-family: "Source Sans Pro", sans-serif;
  padding: 8px 10px;
  margin-top: 10px;
  display: block;
  text-align: left;
  font-size: 16px;
  color: white;
  font-weight: 200;
`;

const CommentInput = styled.input`
  border: 1px solid rgba(252, 252, 252, 0.4);
  background-color: rgba(252, 252, 252, 0.2);
  width: 100%;
  border-radius: 3px;
  font-family: "Source Sans Pro", sans-serif;
  padding: 8px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  text-align: left;
  font-size: 16px;
  color: white;
  font-weight: 200;
`;

export async function getStaticProps() {
  const allergies = await getAllergies();
  const diets = await getDiets();

  return { props: { allergies, diets } };
}
