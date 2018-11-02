import React from 'react';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';


const propTypes = {
    handleClose: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.element
}

 const ModalPopUp = ({
     handleClose,
     show,
     children
    }) => {
    const showHideClassName 
    = show ? 
    'modal-pop display-block':
    'modal-pop display-none';

    return(
        <div className={showHideClassName}>
        <section className='modal-pop-main'>
            <Icon.X 
            className="modalPop_button_close pointer" 
            onClick={handleClose}
            />
        
        {children}
        
        
        </section>
        </div>
    )
}


ModalPopUp.propTypes = propTypes;

export default ModalPopUp;