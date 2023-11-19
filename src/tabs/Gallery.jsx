import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;
    if (prevQuery !== query || prevPage !== page) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    this.setState({ loader: true });
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loader: false });
    }
  };

  handleSubmit = value => {
    this.setState({ query: value });
  };

  render() {
    console.log(this.state.images);
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
