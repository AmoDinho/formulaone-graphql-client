import React, {Component} from 'react';
import * as Icon from 'react-feather';
import '../styles/ModalPopUp.css';

 const Modal = ({handleClose,show,children}) => {
    const showHideClassName = show ? 'modal display-block':'model display-none';

    return(
        <div className={showHideClassName}>
        <section className='modal-main'>
            <Icon.X className="modal_button_close pointer" onClick={handleClose}/>
        
        {children}
        
        
        </section>
        </div>
    )
}

export default Modal;