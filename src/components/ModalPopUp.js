import React, {Component} from 'react';
import * as Icon from 'react-feather';

 const ModalPopUp = ({handleClose,show,children}) => {
    const showHideClassName = show ? 'modal-pop display-block':'modal-pop display-none';

    return(
        <div className={showHideClassName}>
        <section className='modal-pop-main'>
            <Icon.X className="modalPop_button_close pointer" onClick={handleClose}/>
        
        {children}
        
        
        </section>
        </div>
    )
}

export default ModalPopUp;