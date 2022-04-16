import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import Edit from './edit'


function App() {
  
const[page,setPage]=useState(1)
const [rowsPerPage, setRowsPerPage] =useState(10);
const[open,setOpen]=useState(false)
const [users,setUsers]=useState()
const[edititem,setEdititem]=useState()
const [counts,setCounts]=useState()
  useEffect(()=>{
async function getdata(){
  const data=await axios.get(`http://localhost:9000/user/getallusers/?page=${page}`)
  console.log(data.data.users)
setUsers(data.data.users)
}
getdata()
setCounts(Math.floor(users.length/5))
  },[page])
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
const opendialog=(k)=>{
setEdititem(k)
setOpen(true)
}

  return (
    <div className='container'>
     <div className='tablecontainer'>
<table className='table'>
  <tr className='heading'>
    <th>Name</th>
    <th>Email</th>
    <th>Created At</th>
    <th>Updated At</th>
    <th>Action</th>
  </tr>
  {users?.map((u,index)=>
  <tr className='rows'>
    <td className='name'><span className='namehead'>
      {u?.name?.charAt(0)}</span>{u.name}</td>
    <td>{u.email}</td>
    <td>{u?.createdat?.slice(0,16)}</td>
    <td>{u?.updatedat?.slice(0,16)}</td>
    <td>
      <button className='view' onClick={()=>opendialog(u)}>View</button>
      </td>
  </tr>)}
</table>
<div className='rajesh'>
      
      <Pagination count={counts} variant="outlined" shape="rounded" />
      <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
    <Edit open={open} setOpen={setOpen} edititem={edititem} setUsers={setUsers} page={page}/>
</div>
   </div>

  );
}

export default App;