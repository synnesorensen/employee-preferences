import React, { useEffect, useState } from "react"
import { getAllRegisteredPreferences } from "../lib/api"
import { Preference } from "../interfaces"
import styled from "styled-components"
import styles from "../styles/Home.module.css"

export default function RegisteredPreferences() {
  const initial: Preference[] = []
  const [data, setData] = useState(initial)
  const fetchPersons = async () => {
    try {
      const response: Preference[] = await getAllRegisteredPreferences()
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
          <StyledPerson key={d._id}>
            <StyledList
              id={d._id}
              value={d.slug.current}
              key={d._id}
            />
              <StyledA href={`person/${d.slug.current}`} key={d._id}>
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