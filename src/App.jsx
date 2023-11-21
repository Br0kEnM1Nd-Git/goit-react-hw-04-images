import SearchBar from 'components/SearchBar/SearchBar';
import { AppWrapper } from './components/Helpers/Components.styled';
import { Component } from 'react';
import { getImages } from 'service/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Helpers/Helpers';
import { Audio } from 'react-loader-spinner';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    query: '',
    error: null,
    loader: false,
    currImage: '',
    isNewImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page: prevPage } = prevState;
    const { query, page } = this.state;
    if (prevPage !== page) {
      this.getMorePhotos(query, page);
    }
  }

  getMorePhotos = async (query, page) => {
    this.setState({ loader: true });
    try {
      const data = await getImages(query, page);
      const images = data.hits.map(el => {
        const { id, webformatURL, largeImageURL } = el;
        const image = { id, webformatURL, largeImageURL };
        return image;
      });
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
      if (images.length >= 12) {
        this.setState({ isNewImages: true });
      } else {
        this.setState({ isNewImages: false });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loader: false });
    }
  };

  handleSubmit = async query => {
    this.setState({ loader: true });
    try {
      const data = await getImages(query, this.state.page);
      const images = data.hits.map(el => {
        const { id, webformatURL, largeImageURL } = el;
        const image = { id, webformatURL, largeImageURL };
        return image;
      });
      this.setState({ images, query, page: 1 });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loader: false });
    }
  };

  loadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = currImage => {
    this.setState({ currImage });
  };

  closeModal = () => {
    this.setState({ currImage: '' });
  };

  render() {
    const {
      state: { images, loader, currImage, isNewImages },
      handleSubmit,
      loadMore,
      showModal,
      closeModal,
    } = this;
    return (
      <AppWrapper>
        <SearchBar onSubmit={handleSubmit} />
        {images.length > 1 ? (
          <ImageGallery images={images} showModal={showModal} />
        ) : (
          <span>Nothing to show right now</span>
        )}
        {images.length > 0 && !loader && isNewImages && (
          <Button onClick={loadMore} />
        )}
        {loader && <Audio />}
        {currImage && <Modal largeImage={currImage} closeModal={closeModal} />}
      </AppWrapper>
    );
  }
}
