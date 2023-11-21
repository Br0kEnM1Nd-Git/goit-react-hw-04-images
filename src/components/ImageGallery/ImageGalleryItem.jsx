const ImageGalleryItem = ({ image, showModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt="FoundImage"
        className="ImageGalleryItem-image"
        onClick={() => showModal(image.largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
