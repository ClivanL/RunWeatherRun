const compareNearest = (cityDetails, position) => {
    let addCity = cityDetails.map((x) => {
      return Math.sqrt(
        (x.label_location.longitude - position.LONGITUDE) ** 2 +
          (x.label_location.latitude - position.LATITUDE) ** 2
      );
    });
    // console.log(addCity);
    let index = 0;
    let curr = addCity[0];
    for (let i = 1; i < addCity.length; i++) {
      if (addCity[i] < curr) {
        curr = addCity[i];
        index = i;
      }
    }
    // console.log(index);
    return index;
  };

  export default compareNearest;