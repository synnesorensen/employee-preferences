import React, { useEffect, useState } from "react"
import { getAllRegisteredPreferences } from "../lib/api"
import Link from "next/link"
import styled from "styled-components"
import styles from "../styles/Home.module.css"

export default function RegisteredPreferences() {
  const [data, setData] = useState([])
  const fetchPersons = async () => {
    try {
      const response = await getAllRegisteredPreferences()
      setData(response)
    } catch (err) {
      console.log("Something went wrong: ", err)
    }
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  return (
    <div className={styles.card}>
      <h1>Registrerte personer</h1>
      <Persons>
        {data?.map((d) => (
          <StyledPerson>
            <StyledRadio
              id={d._id}
              type="radio"
              name="prefRadio"
              value={d._id}
              key={d._id}
            />
            <Link key={d._id} href={`person/${d.slug.current}`}>
              <a>
                <span>{d.name}</span>
              </a>
            </Link>
          </StyledPerson>
        ))}
      </Persons>
    </div>
  )
}

const Persons = styled.div`
  overflow-y: scroll;
  border-radius: 4px;
  > div {
    padding: 12px;
`

const StyledPerson = styled.div`
  label {
    display: block;
    align-items: center;
    cursor: pointer;
  }
  :hover {
    background-color: rgba(252, 252, 252, 0.2);
  }
  cursor: pointer;
`

const StyledRadio = styled.input.attrs({
  type: "text"
})`
  display: none;
`
