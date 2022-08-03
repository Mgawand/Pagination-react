import React, { useState, useEffect, useMemo } from 'react';
// import Header from './components/Header';
import PaginationPage from './components/PaginationPage';
import {Search} from './components/Search';

function App() {
   const [data, setData] = useState([]);
   const [totalItems, setTotalItems] =useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const perPage = 10;
   const [search, setSearch] = useState("");
   const [sorting, setSorting] = useState({ field: "", order: "" });


   const headers = [{name:"Id", field: "id", sortable: true},{name:"Country", field: "place_of_origin", sortable: true},{name:"Artwork title", field: "artwork_type_title", sortable: true},{name:"Department-title", field: "department_title", sortable: true}]
   useEffect(() => {
         const fetchData = async (page, per_page) => {
      fetch(
         // `https://jsonplaceholder.typicode.com/comments`
         `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${per_page}`
      )
         .then((res) => res.json())
         .then(
            (result) => {
               setData(result);
               console.log(result.data);
            }).catch(() => {
               alert(`error while fetching data`)
            });
         
   };
   fetchData(1, perPage);
}, [perPage])

   const commentsData = useMemo(()=> {

      let computedComments = data;

      if(search){
         computedComments = computedComments.filter( 
            data => 
            data.artwork_type_title.toLowerCase().includes(search.toLowerCase()) 
            ||
            data.place_of_origin.toLowerCase().includes(search.toLowerCase())
            )         
      }
       setTotalItems(computedComments.length);

       if (sorting.field) {
         const reversed = sorting.order === "asc" ? 1 : -1;
         computedComments = computedComments.sort(
             (a, b) =>
                 reversed * a[sorting.field].localeCompare(b[sorting.field])
         );
     }

         const indexOfLastRecord = currentPage * perPage;
         const indexOfFirstRecord = indexOfLastRecord - perPage;
         const currentRecords = computedComments.slice(indexOfFirstRecord, indexOfLastRecord);
         console.log(currentRecords)
      return currentRecords;
 
      },[data, currentPage, search, sorting ])
      
      
        return (
         <>
            {/* <Header title="Artwork" /> */}

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <PaginationPage
                              total={totalItems}
                              itemsPerPage={perPage}
                              currentPage={currentPage}
                              onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                           <div className="col-md-6 d-flex flex-row-reverse">
                           <Search onSearch={value =>{ setSearch(value);
                                 setCurrentPage(1)}}/>
                            
                           </div>
                     </div>

                    <table className="table table-striped">
                    {/* <Header 
                        headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        /> */}
                        <tbody>
                        {commentsData.map(item => (
                              <tr>
                                 <td>{item.id} </td>
                                 <td>{item.place_of_origin} </td>
                                 <td>{item.artwork_type_title} </td>
                                 <td>{item.department_title} </td>
                              </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
         
      );
   }



export default App;