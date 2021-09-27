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
            <StyledList
              id={d._id}
              value={d.slug}
              key={d._id}
            />
              <StyledA href={`person/${d.slug.current}`}>
                {d.name}
              </StyledA>
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
  display: block;
`

const StyledList = styled.li.attrs({
  type: "text"
})`
  display: none;
`

const StyledA = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`