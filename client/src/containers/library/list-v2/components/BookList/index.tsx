import React, { PureComponent, ReactNode } from 'react';

import * as PT from '../../propTypes';
import { IBook } from '../../../../../types';

interface IBookListProps {
  datas: IBook[];
  onClick: (book: IBook) => void;
}

type Props = Readonly<IBookListProps>;

class BookList extends PureComponent<Props> {
  public static propTypes = {
    datas: PT.books,
    onClick: PT.onBookClick
  };

  public static defaultProps: Props = {
    datas: [],
    onClick: () => null
  };

  public render(): ReactNode {
    const { datas, onClick } = this.props;
    return (
      <div>
        <ul>
          {datas.map((data: IBook) => {
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

export { BookList };
