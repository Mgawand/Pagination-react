import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Records } from './components/Records';
import Pagination from './components/Pagination';

function App() {
   const [data, setData] = useState([]);
   const [isLoaded, setIsLoaded] = useState(true);
   const [currentPage, setCurrentPage] = useState(0);
   const [perPage] = useState(10);

   useEffect(() => {
      fetchData(1, perPage);
   }, [perPage]);

   const fetchData = async (page, per_page) => {
      fetch(
         `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${per_page}`
      )
         .then((res) => res.json())
         .then(
            (result) => {
               setIsLoaded(false);
               setData(result.data);
            }).catch(() => {
               alert(`error while fetching data`)
            });
         
   };
   
   const indexOfLastRecord = currentPage * perPage;
   const indexOfFirstRecord = indexOfLastRecord - perPage;
   const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
   const nPages = Math.ceil(data.length / perPage)
   
      return (
         <div className="App">
            <Header />
            <Records data= {currentRecords}/>
            <Pagination 
            nPages = {nPages}
            currentPage= {currentPage}
            setCurrentPage= {setCurrentPage}/>
                    </div>
      );
   }


export default App;
