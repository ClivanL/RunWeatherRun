import Navbar from "../../Components/Navbar";
import runningroutes from "../../runningroutes";
import {useContext} from 'react'
import {FavsRoutes} from '../../App'
import {useNavigate, } from 'react-router-dom'
import CustomizedTables from "../../Components/Table";
import { Button } from '@mui/material'

function ListOfTracks({location}){
    const context=useContext(FavsRoutes);
    const navigate=useNavigate();
    // console.log(location);

function handleAdd(newRoute){
    // console.log("added");
    // console.log(newRoute);
    context.setFavsRoutes([...context.favsRoutes,newRoute]);
}

function handleMap(){
    // console.log("clickmap");
    navigate("/listoftracks/mapplot")
}

    return(
        <>
       <Navbar/>
       <CustomizedTables runningroutes={runningroutes} handleAdd={handleAdd} favsRoutes={context.favsRoutes} location={location}/>
        <Button size="large" variant="contained" onClick={handleMap}>Let's GOOOOOOOOOO LIAO!</Button>
        </>
    )
}

export default ListOfTracks;