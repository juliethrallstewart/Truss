import React, { useContext, useMemo, useRef } from 'react';
import {useTable, useSortBy } from 'react-table'
import PlanetsContext from '../contexts/PlanetsContext'
import ErrorComponent from './ErrorComponent'
import Loader from 'react-loader-spinner'


const PlanetTableComponent = () => {
    const {planets, loading, error} = useContext(PlanetsContext)

    const errorRef = useRef()
    errorRef.current = error
    
    const cleanData = () => {
        let arr = []
        
        planets.forEach(x => {
            for (let i of x) {
            let obj = {
                col1: i.name === "unknown" ? "?" : <a href={i.url} target="_blank" rel="noreferrer">{i.name}</a>,
                col2: i.climate === "unknown" ? "?" : i.climate,
                col3: i.residents === "unknown" || i.residents === undefined ? "?" : i.residents.length,
                col4: i.terrain === "unknown" ? "?" : i.terrain,
                col5: i.population === "unknown" ? "?" : Number(i.population),
                col6: i.surface_water === "unknown" ? "?" : Math.round(i.surface_water) + "%"
                }
              arr.push(obj)
            } 
            
        })
    
        return arr
    }

    const data = useMemo(
        () => cleanData(), [planets]
    )

     // accessor is the "key" in the data 
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
        errorRef.current ? <ErrorComponent />:
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