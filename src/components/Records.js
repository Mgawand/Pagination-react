import React from 'react'

export const Records = ({data}) => {
  return (
    <table className="table">
        <thead>
            <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Country </th>
                <th scope='col'>Date-start </th>
                <th scope='col'>Date-end</th>

            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr>
                    <td>{item.id} </td>
                    <td>{item.place_of_origin} </td>
                    <td>{item.date_start} </td>
                    <td>{item.date_end} </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}
