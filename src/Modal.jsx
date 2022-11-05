import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent(props) {
    const textRef = useRef()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDecline = () => {
        textRef.current.innerHTML = `Sorry to hear that &#128546;`
    }
    const handleAccpet = () => {
        const text = loanOffer === "3a" ? "Your funds are on the way! The loan term is 5 months. 🥳"
            : "Your funds are on the way! The loan term is 24 months. 🥳"
        textRef.current.innerHTML = text
    }

    const { loanOffer } = props
    const bodyText = loanOffer === "3a" ? "Congratulations you have been approved for a $500 loan!" : "Congratulations you have been approved for a $10,000 loan!"

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={props.disabledNext}>
                Next <strong>&gt;</strong>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>VIVA Finance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bodyText}
                    <br />
                    <br />
                    <div className="modalMessage" ref={textRef}>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalButton">
                    <Button variant="primary" onClick={handleDecline}>
                        Decline
                    </Button>
                    <Button variant="primary" onClick={handleAccpet}>
                        Accept!
                    </Button>
                </Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal>
        </>
    );

}
