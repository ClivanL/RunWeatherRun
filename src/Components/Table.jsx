import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MapIcon from '@mui/icons-material/Map';
import { Button } from '@mui/material'
import compareNearest from '../Functions/compareNearest';
import findCenter from '../Functions/findCenter';
import convertToCoordinates from '../Functions/convertToCoordinates';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables({runningroutes, handleAdd, favsRoutes, location}) {
  // console.log(runningroutes[0].route);
  // console.log(convertToCoordinates(runningroutes[0].route))
  // console.log (findCenter(convertToCoordinates(runningroutes[0].route)))
  // console.log({"LATITUDE":findCenter(convertToCoordinates(runningroutes[0].route)).lat, "LONGTITUDE":findCenter(convertToCoordinates(runningroutes[0].route)).long})
  // console.log(location?.area_metadata)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Distance</StyledTableCell>
            <StyledTableCell align="right">Weather Forecast(2hrs)</StyledTableCell>
            <StyledTableCell align="right">Weather Forecast(24hrs)</StyledTableCell>
            <StyledTableCell align="right">Add to Map</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runningroutes.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.distance}</StyledTableCell>
              <StyledTableCell align="right">{location?.items?.[0]?.forecasts?.[compareNearest(location?.area_metadata,{"LATITUDE":findCenter(convertToCoordinates(row.route)).lat,"LONGTITUDE":findCenter(convertToCoordinates(row.route)).long})]?.forecast}</StyledTableCell>
              <StyledTableCell align="right"><EngineeringSharpIcon/>Function for the future</StyledTableCell>
              <StyledTableCell align="right">{favsRoutes.indexOf(row)!==-1?<Button variant="contained" style={{background:"green"}} onClick={()=>handleAdd(row)}>Added</Button>:<Button variant="contained" onClick={()=>handleAdd(row)} startIcon={<MapIcon />}>
  Add to map!
</Button>}
</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}