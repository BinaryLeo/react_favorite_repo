import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://api.github.com/users/binaryleo/repos',
      )
      const data = await response.json() // return data in json format
      setList(data)
    }
    fetchData()
  }, []) // [] means that this effect will only run once - an initial render

  useEffect(() => {
    const filtered = list.filter((list) => list.favorite) // filter out the favorite repos
    document.title = `Favorite Repos: ${filtered.length}` // this is a side effect
  }, [list]) // this effect will run every time the list changes

  function handleFavorite(id) {
    const favoriteRepo = list.map((list) => {
      return list.id === id ? { ...list, favorite: !list.favorite } : list
      // run through the repos and return the repo with the same id as the id passed in
      // if the id matches, add a favorite property to the repo as true
    })
    setList(favoriteRepo)
  }
  return (
    <>
      <ul>
        {list.map((list) => {
          return (
            <LI key={list.id}>
              <p>
                <Button onClick={() => handleFavorite(list.id)}>
                  Favorite
                </Button>
                {list.favorite && <span> ⭐ </span>}
                <A href = {list.html_url}>{list.name}</A>
                <Span> - {list.description}</Span>
              </p>
            </LI>
          )
        })}
      </ul>
    </>
  )
}
const Button = styled.button` // styled components are used to style the button
  background: transparent;
  border-radius: 3px;
  border: 2px solid #18F8D7;
  color: #18F8D7;
  margin: 0 1em;
  padding: 0.25em 1em;
`
const LI = styled.li` // styled components are used to style the list items
  list-style: none;
  margin: 0.5em 0;
  border: 1px solid #fff;
  text-transform: lowercase;
`
const A = styled.a`
  text-decoration: none;
  color: #fff;`
 
 const Span = styled.span`
  color: #18F8D7;
  font-size: 0.8em;
  margin-left: 0.5em;
`
export default App
