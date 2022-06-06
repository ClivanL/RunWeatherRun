import Navbar from "../../Components/Navbar";
import runningroutes from "../../runningroutes";
import {useContext} from 'react'
import {FavsRoutes} from '../../App'
import {useNavigate} from 'react-router-dom'
import CustomizedTables from "../../Components/Table";
import { Button } from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import useLocation from '../../hooks/useLocation'

function ListOfTracks(){
    const context=useContext(FavsRoutes);
    const navigate=useNavigate();

function handleAdd(newRoute){
    context.setFavsRoutes([...context.favsRoutes,newRoute]);
}

function handleMap(){
    navigate("/listoftracks/mapplot")
}

const location=useLocation();

    return(
        <>
       <Navbar/>
       <CustomizedTables runningroutes={runningroutes} handleAdd={handleAdd} favsRoutes={context.favsRoutes} location={location}/>
        <Button size="large" variant="contained" onClick={handleMap}>Let's Go!</Button>
        <Button size="large" style={{background:"gray"}}variant="contained" onClick={()=>context.setFavsRoutes([])}> <DeleteSweepIcon/>Clear Selection</Button>
        </>
    )
}

export default ListOfTracks;