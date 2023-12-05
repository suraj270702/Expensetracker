import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transaction = () => {
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  let storedTransactionData = localStorage.getItem("expensesData");
  let initialTransactionsData = storedTransactionData
    ? JSON.parse(storedTransactionData)
    : [];
  const [transactionData, setTransactionData] = useState(
    initialTransactionsData
  );
  const [filterData, setFilterData] = useState(transactionData);
  const [page,setPage] = useState(0)
  const [pageSize,setPageSize] = useState(Math.ceil(filterData.length/10))
  useEffect(()=>{
    let filteredData = transactionData.filter((item)=>item.year===yearFilter && item.month === monthFilter )
    setPageSize(Math.ceil(filteredData.length/10))
    setFilterData(filteredData)
  },[monthFilter,yearFilter])

  useEffect(()=>{
    let start = page * 10
    let end = start+10
   let paginationData = transactionData.slice(start,end)
   setFilterData(paginationData)
   //console.log(paginationData)
  },[page])

  const handlePrev=()=>{
    setPage((prev)=>Math.max(prev-1,0))
    console.log("previous clicked")
  }

  const handleNext=()=>{
    setPage((prev)=>Math.max(prev+1,pageSize-1))
    console.log("Next Clicked")
  }


  const handlePage =(index)=>{
    setPage(index)
  }
 // console.log(yearFilter)
  return (
    <>
      <div className="md:ml-[350px] px-3 md:px-6 md:py-10">
        <div>
          <div className="w-full md:w-[1050px] flex flex-row justify-between items-center gap-y-4 md:gap-y-0 mt-4 md:mt-0">
            <Box sx={{ minWidth: 120, background: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={monthFilter}
                  label="Month"
                  onChange={(e)=>setMonthFilter(e.target.value)}
                >
                  {new Array(12).fill("").map((_, index) => (
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, background: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearFilter}
                  label="Year"
                  onChange={(e)=>setYearFilter(e.target.value)}
                >
                  {new Array(5).fill("").map((_, index) => (
                    <MenuItem value={new Date().getFullYear() + index}>
                      {new Date().getFullYear() + index}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="mt-4 ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-[1050px]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Expense
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Payment Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.map((transaction, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-white dark:text-white dark:bg-white"
                      >
                        {transaction.expenseDate.substring(0, 10)}
                      </th>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        {transaction.expense}
                      </td>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        &#8377;{parseInt(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        {transaction.paymentType}
                      </td>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        {transaction.month}
                      </td>
                      <td className="px-6 py-4 bg-white dark:text-white dark:bg-white">
                        {transaction.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination mt-4 w-full">
          <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-10 text-base">
    <li>
      <span   className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <button className="sr-only" onClick={handlePrev} disabled={page===0}>Previous</button>
        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
      </span>
    </li>
    {
        new Array(pageSize).fill('').map((_,i)=>(
            <li key={i}>
      <button disabled={pageSize-1===page} onClick={()=>setPage(i)}  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >{i+1}</button>
    </li>
        ))
    }
    <li>
      <span onClick={handleNext}  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <button onClick={handleNext} className="sr-only">Next</button>
        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </span>
    </li>
  </ul>
</nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
