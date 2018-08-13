import React, { Component } from 'react';

import * as PT from '../../propTypes';
class BookList extends Component {
  render() {
    const { datas, onClick } = this.props;
    return (
      <div>
        <ul>
          {datas.map(data => {
            return (
              <li key={data.id} onClick={() => onClick(data)}>
                {data.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

BookList.propTypes = {
  datas: PT.books,
  onClick: PT.onBookClick
};

export default BookList;
