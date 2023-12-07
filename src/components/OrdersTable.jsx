import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { add, decrement } from "../app/features/counter";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "Date", label: "Date", minWidth: 170 },
  { id: "Day", label: "Day", minWidth: 100 },
  {
    id: "Month",
    label: "Month",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Payment",
    label: "Payment",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Year",
    label: "Year",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

//console.log(ordersData)

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function OrdersTable() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let data = localStorage.getItem("ordersData");

  let ordersData = data ? JSON.parse(data) : [];
  const [ordersDataState, setOrdersState] = React.useState(ordersData);
  const [filteredData, setFilteredData] = React.useState(ordersDataState);
  const [filterOrdersData, setFilterOrdersData] =
    React.useState(ordersDataState);
  const [yearFilter, setYearFilter] = React.useState(new Date().getFullYear());
  const [monthFilter, setMonthFilter] = React.useState(
    new Date().getMonth() + 1
  );
  const [totalPages,setTotalPages] = React.useState(Math.ceil(filterOrdersData.length/rowsPerPage))
  React.useEffect(() => {
    let filteredOrdersArray = ordersDataState.filter(
      (item) => item.month === monthFilter && item.year === yearFilter
    );
    setFilterOrdersData(filteredOrdersArray);
  }, [ordersDataState, monthFilter, yearFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    let start = page * rowsPerPage;
    let end = start + rowsPerPage;
    let updatedArray = filterOrdersData.slice(start, end);
    setFilteredData(updatedArray);
    let  updatedTotalPages = Math.ceil(filterOrdersData.length / rowsPerPage);
    setTotalPages(updatedTotalPages)
  }, [filterOrdersData, page, rowsPerPage]);

  

  //console.log(totalPages)

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const setPageIndex = (index) => {
    setPage(index);
  };

  return (
    <div
      className="md:ml-[350px] p-3 md:px-6 py-8"
      onClick={() => dispatch(decrement())}
    >
      <div className="w-full md:w-[1050px] flex flex-row justify-between items-center gap-y-4 md:gap-y-0 mt-4 md:mt-0 mb-4 md:mb-10">
            <Box sx={{ minWidth: 120, background: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={monthFilter}
                  label="Month"
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  {new Array(12).fill("").map((_, index) => (
                    <MenuItem value={index + 1} key={index}>{index + 1}</MenuItem>
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
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  {new Array(5).fill("").map((_, index) => (
                    <MenuItem value={new Date().getFullYear() + index} key={index}>
                      {new Date().getFullYear() + index}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-[1050px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Day
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Month
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {order.date}
                </th>
                <td className="px-6 py-4">{order.day}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {order.month}
                </td>
                <td className="px-6 py-4">&#8377;{order.payment}</td>
                <td className="px-6 py-4">{order.qty}</td>
                <td className="px-6 py-4">{order.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="Pagination mt-4 md:mt-8 md:ml-[40%]">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              disabled={page === 0}
              onClick={handlePrevPage}
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => setPageIndex(i)}
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
