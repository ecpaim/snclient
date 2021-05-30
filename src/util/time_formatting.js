
import React from 'react';
const DAY = 86400000; // a day has 24*60*60*1000 milliseconds
const formatTimestamp = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);

    const diff = now.getTime() - then.getTime();

    if( diff < DAY){
        let options = { hour12: false, hour:'2-digit', minute: '2-digit'};
        return then.toLocaleTimeString({},options);
        
    } else {
        let options = {year:'2-digit', month:'2-digit', day:'2-digit'};
        return then.toLocaleDateString({}, options);
    }
}
export default formatTimestamp;