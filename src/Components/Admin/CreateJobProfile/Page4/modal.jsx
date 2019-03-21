import React from 'react';

class Modal extends React.PureComponent{
    render() {
        return (
            <div className="modalComponent">
                <input className="modal-state" id="modal-2" type="checkbox" />
                <div className="modal">
                    <label className="modal__bg" htmlFor="modal-2"></label>
                    <div className="modal__inner">
                        <label className="modal__close" htmlFor="modal-2"></label>
                        <h2>Sleppy sloth</h2>
                        <p><img src="https://i.imgur.com/TPx9zYo.gif" alt="" />Aliquam in sagittis nulla. Curabitur euismod diam eget risus venenatis, sed dictum lectus bibendum. Nunc nunc nisi, hendrerit eget nisi id, rhoncus rutrum velit. Nunc vel mauris dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam fringilla quis nisi eget imperdiet.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;