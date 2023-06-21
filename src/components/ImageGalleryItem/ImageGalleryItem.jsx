import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import './ImageGalleryItem.scss';

export default function ImageGalleryItem({ largeImage, smallImage, tags }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="ImageGalleryItem" onClick={() => setShowModal(!showModal)}>
        <img className="ImageGalleryItem__image" src={smallImage} alt={tags} />
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
