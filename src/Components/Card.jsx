import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { borders } from '@mui/system'


export default function ActionAreaCard({legend, text, images}) {
  // console.log("action area card",images);
  return (
    <Card sx={{ width: 150, borderColor:'primary.main', border: 1, borderRadius: '16px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="25%"
          image={images && images[text]}
          alt={text}
          margin="auto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {legend}
          </Typography>
          <Typography variant="body" color="black">
           {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}