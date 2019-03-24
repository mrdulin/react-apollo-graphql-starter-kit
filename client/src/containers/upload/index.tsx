import React, { PureComponent, ReactNode, ReactNodeArray } from 'react';
import { Query } from 'react-apollo';

import * as M from 'gqlMod/mutations/upload.gql';
import * as Q from 'gqlMod/queries/upload.gql';
import { UploadFile } from './components/UploadFile';

class Upload extends PureComponent {
  public render(): ReactNode {
    return (
      <div>
        <section>
          <UploadFile mutation={M.singleUpload} />
        </section>
        <section>
          <UploadFile multiple mutation={M.multipleUpload} />
        </section>
        <section>
          <Query query={Q.uploads}>
            {({ error, loading, data }) => {
              if (loading) {
                return <p>loading...</p>;
              }
              if (error) {
                return <p>error</p>;
              }
              const rowsJSX: ReactNodeArray = data.uploads.map((file: any) => {
                return (
                  <tr key={file.id}>
                    <td>{file.id}</td>
                    <td>{file.filename}</td>
                  </tr>
                );
              });

              return (
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>filename</th>
                    </tr>
                  </thead>
                  <tbody>{rowsJSX}</tbody>
                </table>
              );
            }}
          </Query>
        </section>
      </div>
    );
  }
}

export default Upload;
