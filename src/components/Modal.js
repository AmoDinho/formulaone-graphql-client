import React, {Component} from 'react';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import '../styles/ModalPopUp.css';

static propTypes = {
    handleClose: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.element
}

 const Modal = ({
     handleClose,
     show,
     children
    }) => {
    const showHideClassName = 
    show ? 
    'modal display-block'
    :
    'model display-none';

    return(
        <div className={showHideClassName}>
        <section className='modal-main'>
            <Icon.X 
            className="modal_button_close pointer" 
            onClick={handleClose}
            />
        
        {children}
        
        
        </section>
        </div>
    )
}


Modal.propTypes = propTypes;

export default Modal;