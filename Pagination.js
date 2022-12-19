import axios from 'axios';
import React, { useEffect, useState } from 'react'
export default function Pagination() {
    const[value,setValue]=useState([]);
    const[search,setSearch]=useState("");
    const[filtered,setFiltered]=useState(["id","name","age"])
     const[sorted,setSorted]=useState("Asc");
     const[number,setNumber]=useState(1);
     const PostPerPage=10;
    //  const [searchElem]=useState("")
  


    useEffect(()=>{
        axios.get("http://localhost:4000/pagination")
        .then(response=>{
        setValue(response.data);
        setFiltered(value.filter(data=>{return data.name.toLowerCase().includes(search.toLowerCase());}))      
        });
    },[search,value]);

        // function find(value){
        //     return value.filter((Val)=>{
        //         if(Val.name===filtered){
        //             searchElem.some((newVal)=>{
        //             return(
        //                     Val[newVal].toString().toLowerCase().indexOf(search.toLowerCase())> -1
        //                 );
        //             })
        //         }else if(filtered==="All"){
        //             return searchElem.some((newVal)=>{
        //                 return(
        //                     Val[newVal].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
        //                 );
        //             });
        //         }
        //     });

        // }
  
  
   const handleSort=(col)=>{
        if(sorted==="Asc"){
            const sorting=[...value].sort((a,b)=>a[col].toLowerCase() > b[col].toLowerCase()?1: -1
            );
            setValue(sorting);
            setSorted("Des");

        }if(sorted==="Des")
        {
            const sorting=[...value].sort((b,a)=>b[col].toLowerCase() > a[col].toLowerCase() ?1: -1
            );
            setValue(sorting);
            setSorted("Asc");

        }
    }
    const lastPage = number * PostPerPage;
    const firstPage = lastPage - PostPerPage;
    const currentPage = value.slice(firstPage, lastPage);
    const pageNumber = [];
  
    for (let i = 1; i <= Math.ceil(value.length / PostPerPage); i++) {
        pageNumber.push(i);
      }
    const changePage = (pageNumber) => {
        setNumber(pageNumber);
    }  
return (
    <div>
    <input type="text" placeholder="search here..." value={search} onChange={(e)=>setSearch(e.target.value)}></input>
    <table>
    <thead>
        <tr>
            <th onClick={()=>handleSort("id")}>S.No ↑↓</th>
            <th onClick={()=>handleSort("name")}>Name ↑↓</th>
            <th onClick={()=>handleSort("email")}>Email ↑↓</th>
            <th onClick={()=>handleSort("age")}>Age ↑↓</th>
        </tr>
        </thead>
        <tbody>
        {currentPage.map((value,index)=>(
            <tr key={index}>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.age}</td>
        </tr>
     
       )) }
         </tbody>
        </table>
        <button onClick={()=>setNumber(number-1)}>Previous</button>
    {pageNumber.map((ele)=>{
        return(<button onClick={()=>changePage(ele)}>{ele}</button>
        );
    })}
    <button onClick={()=>setNumber(number+1)}>Next</button>
    </div>
  )
}

