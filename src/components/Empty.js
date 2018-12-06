import React from 'react';
import {Link} from 'react-router-dom';

const styles = {
    textAlign:'center'
}

const Empty = ({
   to,
   text
}) => {
    return (
        <Link
        to={to}
        >
         <p style={styles}>There are no {text}, click here to go make one!</p>
        </Link>
)}



export default Empty