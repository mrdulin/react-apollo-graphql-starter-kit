import React, { Component } from 'react';
import { Query } from 'react-apollo';

import * as M from './mutation.gql';
import * as Q from './query.gql';
import UploadFile from './components/UploadFile';

class Upload extends Component {
  render() {
    return (
      <div>
        <section>
          <UploadFile mutation={M.singleUpload} />
        </section>
        <section>mutilple file upload</section>
        <section>
          <Query query={Q.uploads}>
            {({ error, loading, data }) => {
              if (loading) return <p>loading...</p>;
              if (error) return <p>error</p>;
              const rowsJSX = data.uploads.map(file => {
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
