import React, { useContext, useMemo } from 'react';
import {useTable, useSortBy } from 'react-table'
import PlanetsContext from '../contexts/PlanetsContext'
import ErrorComponent from './ErrorComponent'
import Loader from 'react-loader-spinner'


const PlanetTableComponent = () => {
    const {planets, setPlanets, loading, error} = useContext(PlanetsContext)    
    
    // cleanData aggregates the data in planets into a useable form is sorted and that will allow the react-table component
    // to map the data to columns/cells
  
    const cleanData = () => {
        let arr = []
        let planetsCopy = [...planets]
        let sortedPlanetArr = []
        planetsCopy.forEach((arr) => {
            for (let data of arr) {
                sortedPlanetArr.push(data)
            }
        })
        sortedPlanetArr.sort((a, b) => (a.name > b.name) ? 1 : -1)
        
        sortedPlanetArr.forEach(i => {
                if (i.name != "unknown" && i.name != undefined) {
                    let obj = {
                        col1: <a href={i.url} target="_blank" rel="noreferrer">{i.name}</a>,
                        col2: i.climate === "unknown" || i.climate === undefined ? "?" : i.climate,
                        col3: i.residents === "unknown" || i.residents === undefined ? "?" : i.residents.length,
                        col4: i.terrain === "unknown" || i.terrain === undefined ? "?" : i.terrain,
                        col5: i.population === "unknown" || i.population === undefined ? "?" : Number(i.population),
                        col6: i.surface_water === "unknown" || i.surface_water === undefined ? "?" : Math.round(i.surface_water) + "%"
                        }
                    arr.push(obj)
            }  
        })
    
        return arr
    }
    //this is the data that is used as the table data
    const data = useMemo(
        () => cleanData(), [planets]
    )

     // these are the columns and their headings that is used for the table headings/columns, accessor is the "key" in the data 
    const columns = useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'col1',
            
          },
          {
            Header: 'Climate',
            accessor: 'col2',
          },
          {
            Header: 'Residents',
            accessor: 'col3',
          },
          {
            Header: 'Terrains',
            accessor: 'col4',
          },
          {
            Header: 'Population',
            accessor: 'col5',
          },
          {
            Header: 'Surface Water',
            accessor: 'col6',
          },
        ],
        []
      )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data}, useSortBy)

    return (
        loading ?       
            <div className="loader">
                <Loader
                type="TailSpin"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={5000}
                />
            </div> :
        error ? <ErrorComponent />:
        // this is a react-table higher order component that takes the columns and data from above and maps it to a table
        <table {...getTableProps()} style={{ border: 'solid 1px gray' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}

                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table> 
    )
    
}

export default PlanetTableComponent