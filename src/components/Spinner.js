import React from 'react';
import * as Icon from 'react-feather';
import '../styles/Spinner.css';

const Spinner = ({
    className
}) => {

    return(
        <Icon.RefreshCw
        className='spinner'
        />
    )
}

export default Spinner;