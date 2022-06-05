import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GpxParser from "gpxparser";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Polyline,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import runningroutes from "../runningroutes";
import findCenter from '../Functions/findCenter'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const gpxMaps = runningroutes.map((x) => {
    let gpx = new GpxParser();
    gpx.parse(x.route);
    return {
      route: gpx.tracks[0].points.map((p) => [p.lat, p.lon]),
      description: x.description,
      location: x.location,
    };
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(gpxMaps);




  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
          {gpxMaps.map((x, index) => {
            return <Tab key={index} label={x.description} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      {gpxMaps.map((x, index) => {
        return (
          <TabPanel key={x.route} value={value} index={index}>
            <h1>{x.description}</h1>
            <MapContainer
            center={[findCenter(x.route).lat, findCenter(x.route).long]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[findCenter(x.route).lat, findCenter(x.route).long]}></Marker>
                  <Polyline
                    pathOptions={{ fillColor: "red", color: "blue" }}
                    positions={x.route}
                  />
            </MapContainer>
          </TabPanel>
        );
      })}
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
