import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import { bookQuery } from './queries';

class BookPreview extends React.Component {
  render() {
    const {
      data: { loading, error, book }
    } = this.props;
    return (
      <div>
        <h3>{book ? book.title : 'loading...'}</h3>
      </div>
    );
  }
}

BookPreview.propTypes = {
  data: PT.object
};

export default graphql(bookQuery, {
  options: props => {
    console.log(props);
    return {
      variables: { bookId: props.bookId }
    };
  }
})(BookPreview);
