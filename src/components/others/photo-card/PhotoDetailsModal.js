import React, { useState } from 'react';
import {
  Modal, Button, Image, Card,
} from 'react-bootstrap';
import SaveToCollectionsModal2 from '../../photo-page/SaveToCollectionsModal2';
import PhotoMoreDetailsModal from './PhotoMoreDetailsModal';

const PhotoDetailsModal = ({
  photo, allCollections, collectSinglePhoto, likeSinglePhoto,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" className="photo-card-btn-icon photo-card-btn4" onClick={() => setShow(true)}>
        <i className="bi bi-search" />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Photo by
            {' '}
            {photo.photographer}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-profile">
            <div className="profile-item">
              <Image src={photo.small} magin={10} fluid />
            </div>
            <div className="profile-item">
              <div className="container-col">
                <div className="container-col">
                  <div id={photo.id}>
                    <Button variant="light" onClick={() => window.open(photo.downloadPage)}>
                      <i className="bi bi-download" />
                    </Button>
                  </div>
                  <div className="button-0">
                    <SaveToCollectionsModal2
                      photo={photo}
                      allCollections={allCollections}
                      collectSinglePhoto={collectSinglePhoto}
                    />
                  </div>
                  <div className="button-0">
                    <Button variant="light" onClick={() => likeSinglePhoto(photo)}>
                      {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                      {photo.isLiked && (
                        <div className="red-icon">
                          <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                        </div>
                      )}
                    </Button>
                  </div>
                  <div className="button-0">
                    <PhotoMoreDetailsModal photo={photo} />
                  </div>
                  <div className="container-row-2">
                    Photo by
                    {' '}
                    {photo.photographer}
                  </div>
                  <div>
                    from
                    <Card.Link href="#" className="col-item-0">{photo.creditWeb}</Card.Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoDetailsModal;