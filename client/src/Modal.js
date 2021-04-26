import React, { PureComponent } from 'react';


export default class Modal extends PureComponent {

  render() {
    const { children, onClose } = this.props;
    return (
      <div id="myModal" className="modal-small">
        <div className="modal-content-small">
          <span className="close-small" onClick={onClose}>&times;</span>
            <div>
                {children}
            </div>
        </div>
      </div>
    );
  }
}

