const Modal = ({ largeImage, closeModal }) => {
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={largeImage} alt="Img" className="ImageGalleryItem-image" />
      </div>
    </div>
  );
};

export default Modal;
