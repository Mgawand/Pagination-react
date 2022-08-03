import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import PaginationPage from './components/PaginationPage';
import {Search} from './components/Search';

function App() {
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   let [perPage, setPerPage] = useState('');
   const [search, setSearch] = useState("");
   const [sorting, setSorting] = useState({ field: "", order: "" });
   const [paginationData, setPaginationData] = useState({});


   const headers = [{name:"Id", field: "id", sortable: true},{name:"Country", field: "place_of_origin", sortable: true},{name:"Artwork title", field: "artwork_type_title", sortable: true},{name:"Department-title", field: "department_title", sortable: true}]
   useEffect(() => {
      fetch(
         `https://api.artic.edu/api/v1/artworks/search?q=${search}&page=${currentPage}&limit=${perPage}`
      )
         .then((res) => res.json())
         .then(
            (result) => {
               setData(result);
               setPaginationData(result.pagination);
               console.log(result.data);
            }).catch(() => {
               alert(`error while fetching data`)
            });
         
         }, [perPage, currentPage, search])
         return (
         <>
               <h1>ArtWork</h1>

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row" style={{display: "flex", justifyContent: 'space-evenly'}}>
                        <div className="col-md-6">
                           
                        <PaginationPage 
                           currentPage= {currentPage}
                           setCurrentPage= {setCurrentPage}/>
                            {/* {[1,2,3,4].map((e) => (
                              <div onClick = {() => setCurrentPage(e)}>
                                 {e}
                              </div>
                            ) )} */}
                        </div>
                        <div>
                        <select value={perPage} onChange= {e => setPerPage(Number(e.target.value))}>
                           {
                              [10,15,20,50].map(perPage => (
                                 <option key={perPage} value={perPage}>
                                 Show {perPage}
                                 </option>
                              ))
                           }
                           </select>
                        </div>
                           <div className="col-md-6 d-flex flex-row-reverse">
                           <Search onSearch={value =>{ setSearch(value);
                                 setCurrentPage(1)}}/>
                            
                           </div>
                     </div>

                    <table className="table table-striped">
                    <Header 
                        headers={headers}

                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        {data && data.data && data.data.length > 0 ? 
                        <tbody>
                        {data.data.map(item => (
                              <tr>
                                 <td>{item.id} </td>
                                 <td>{item.title} </td>
                                 <td>{item.api_model} </td>
                                 <td>{item.timestamp} </td>
                              </tr>
                           ))}
                        </tbody>
                        : null}
                    </table>
                </div>
            </div>
        </>
         
      );
   }



export default App;