const findCenter=(arr)=>{
    let count=0;
    let x=0;
    let y=0;
    for (let i=0;i<arr.length;i++){
    x+=arr[i][0];
    y+=arr[i][1];
    count+=1
    }
    return {count:count,lat:x/count,long:y/count};
    }
    
    export default findCenter;