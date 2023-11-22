import SearchBar from 'components/SearchBar/SearchBar';
import { AppWrapper } from './components/Helpers/Components.styled';
import { useEffect, useState } from 'react';
import { getImages } from 'service/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Helpers/Helpers';
import { Audio } from 'react-loader-spinner';
import Modal from 'components/Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currImage, setCurrImage] = useState('');
  const [isNewImages, setIsNewImages] = useState(true);

  useEffect(() => {
    if (query.length > 0) getMorePhotos(query, page);
  }, [query, page]);

  const getMorePhotos = async (query, page) => {
    setLoader(true);
    setError(null);
    try {
      const data = await getImages(query, page);
      const images = data.hits.map(el => {
        const { id, webformatURL, largeImageURL } = el;
        const image = { id, webformatURL, largeImageURL };
        return image;
      });

      page > 1
        ? setImages(prevImages => [...prevImages, ...images])
        : setImages(images);

      if (images.length >= 12) {
        setIsNewImages(true);
      } else {
        setIsNewImages(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const showModal = currImage => {
    setCurrImage(currImage);
  };

  const closeModal = () => {
    setCurrImage('');
  };

  return (
    <AppWrapper>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 1 ? (
        <ImageGallery images={images} showModal={showModal} />
      ) : (
        (error && <span>{error}</span>) || (
          <span>Nothing to show right now</span>
        )
      )}
      {images.length > 0 && !loader && isNewImages && (
        <Button onClick={loadMore} />
      )}
      {loader && <Audio />}
      {currImage && <Modal largeImage={currImage} closeModal={closeModal} />}
    </AppWrapper>
  );
};
