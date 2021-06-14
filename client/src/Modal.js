import React, { PureComponent } from 'react';
import Confetti from 'react-confetti';


export default class Modal extends PureComponent {

  render() {
    const { children, onClose, conffetti, cantClose } = this.props;
    return (
      <div id="myModal" className="modal-small" style={{overflowY: 'hidden'}} onClick={onClose}>
        <div className="modal-content-small" onClick={(event)=>{event.stopPropagation();}}>
          {!cantClose && <span className="close-small" onClick={onClose}>&times;</span>}
            <div>
                {children}
            </div>
        </div>
        <div style={{position: 'absolute', top: '0px',left: '0px', zIndex: -1}}>
            {conffetti && <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={200}
                recycle={false}
                gravity={2}
            />}
            </div>
      </div>
    );
  }
}

