import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            image={image}
            key={image.id}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
