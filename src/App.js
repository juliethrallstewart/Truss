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

  useEffect(() => {
    let resultsCountRequired = 0
    axios.get(planetsApi)
    .then(res => {
      const apiPromises = []
      resultsCountRequired = (Number(res.data.count) / 10)
      apiPromises.push(planetsApi)

      for (let i=1; i<resultsCountRequired;i++) {
          apiPromises.push(`https://swapi.dev/api/planets/?page=${i + 1}`)
        }
      Promise.all(apiPromises)
      .then(responses => {
        const processedResponses = []
       
        for (let response of responses) {
          axios.get(response)
          .then(res => {
            processedResponses.push(res.data.results)
            setPlanets([...planets, ...processedResponses])
            setLoading(false)
            setError(false)
          })
          .catch(err => {
            console.log(err);
            setError(true)
            setLoading(false)
          })
        } 

  })
  .catch(err => {
    console.log(err);
  })
})
}, [])

  return (
    <PlanetsContext.Provider value={{planets, loading, error}}>
      <div className="App">
        <PlanetTableComponent />
      </div>
    </PlanetsContext.Provider>
  );
}
  
export default App;
