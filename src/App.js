import React, {useEffect, useState, useRef} from 'react'
import './App.css';
import axios from 'axios';
import PlanetsContext from '../src/contexts/PlanetsContext';
import PlanetTableComponent from '../src/components/PlanetTableComponent.jsx'

function App() {

  const [planets, setPlanets] = useState([])

  const [planetsApi, setPlanetsApi] = useState("https://swapi.dev/api/planets/")

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  // fetch and set results in state
  useEffect(() => {
    let resultsCountRequired = 0
    axios.get(planetsApi)
    .then(res => {
      const apiPromises = []
      // this api returns a total of 60 planet results, 10 per page
      resultsCountRequired = (Number(res.data.count) / 10)
      //push the first apr response to apiPromises
      apiPromises.push(planetsApi)
      //then make push the remaining urls to visit to the apiPromises array
      for (let i=1; i<resultsCountRequired;i++) {
          apiPromises.push(`https://swapi.dev/api/planets/?page=${i + 1}`)
        }
      //once promises resolve make an api call to each of the urls 
      Promise.all(apiPromises)
      .then(responses => {
        const processedResponses = []
        for (let response of responses) {
          axios.get(response)
          .then(res => {
             //pushthe results to a processedResponses array
            processedResponses.push(res.data.results)
            setPlanets([...planets, ...processedResponses])
            // set loading to false
            setLoading(false)
          })
          .catch(err => {
            //if error set error to true and loading to false
            console.log(err);
            setError(true)
            setLoading(false)
          })
        } 

  })
  .catch(err => {
    setError(true)
    setLoading(false)
    console.log(err);
  })
})
.catch(err => {
  setError(true)
  setLoading(false)
  console.log(err);
})
}, [])

  return (
    <PlanetsContext.Provider value={{planets, setPlanets, loading, error}}>
      <div className="App">
        <PlanetTableComponent />
      </div>
    </PlanetsContext.Provider>
  );
}
  
export default App;
