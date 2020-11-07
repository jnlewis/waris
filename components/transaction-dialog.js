import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { submitTransaction } from '../core/services/stellarService';
import StorageService from './../core/services/storageService';

export default function TransactionDialog(props) {

  const [submissionCount, setSubmissionCount] = useState(0);

  const [submissionState, setSubmissionState] = useState('default');

  const handleCancel = () => props.onCancel();
  const handleDone = () => props.onFinish();

  const handleSubmit = () => {
    setSubmissionState('loading');
    submitTransaction(props.transaction).then(success => {
      
      // TODO: for demo purpose, simulate failure and retry
      if (props.transactionMetadata.type === 'CreateClaimable') {
        if (submissionCount === 0) {
          success = false;
        }
      }
      setSubmissionCount(submissionCount + 1);

      if (success) {
        setSubmissionState('complete');

        // TODO: temporary storage
        if (props.transactionMetadata.type === 'CreateClaimable') {
          StorageService.addClaimable(props.transactionMetadata);
        }
        if (props.transactionMetadata.type === 'Claim') {
          StorageService.removeClaimable(props.transactionMetadata);
        }
      } else {
        setSubmissionState('failed');
      }
    });
  };

  const handleRetry = () => {
    handleSubmit();
  };
  
  return (
    <Modal 
      show={props.show}
      size="lg"
      onHide={handleCancel}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submissionState === 'default' && <div>{props.desc}</div>}
        {submissionState === 'loading' && <div>Submitting. Please wait...</div>}
        {submissionState === 'failed' && <div>Submission was not successful. Would you like to retry?</div>}
        {submissionState === 'complete' && <div>Submission was successful.</div>}
      </Modal.Body>
      <Modal.Footer>
        {(submissionState === 'default' || submissionState === 'failed') && (
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        {(submissionState === 'default') && (
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {(submissionState === 'failed') && (
          <Button variant="primary" onClick={handleRetry}>
            Retry
          </Button>
        )}
        {(submissionState === 'complete') && (
          <Button variant="primary" onClick={handleDone}>
            Done
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
