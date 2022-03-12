import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import styles from "./DetailsModal.css";
function DetailsModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.modal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.data && (
                    <div>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                className="rounded-circle"
                                src={props.data.picture.large}
                            />
                        </div>
                        <div className="mx-3">
                            <h6>
                                Name:{" "}
                                <span className="text-muted">
                                    {props.data.name.first}{" "}
                                    {props.data.name.last}
                                </span>
                            </h6>
                            <h6>
                                DOB:{" "}
                                <span className="text-muted">
                                    {props.data.dob.date.substring(0, 10)}
                                </span>
                            </h6>
                            <h6>
                                Email:{" "}
                                <span className="text-muted">
                                    {props.data.email}
                                </span>
                            </h6>
                            <h6>
                                Phone:{" "}
                                <span className="text-muted">
                                    {props.data.cell}
                                </span>
                            </h6>
                            <h6 className="text-capitalize">
                                Gender:{" "}
                                <span className="text-muted">
                                    {props.data.gender}
                                </span>
                            </h6>
                            <h6 className="text-capitalize">
                                Location:{" "}
                                <span className="text-muted">
                                    {props.data.location.city},{" "}
                                    {props.data.location.country}
                                </span>
                            </h6>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default DetailsModal;
