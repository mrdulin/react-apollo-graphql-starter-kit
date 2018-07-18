import React, { Component } from 'react';

import * as M from './Mutation.gql';
import UploadFile from './components/UploadFile';

class Upload extends Component {
  render() {
    return (
      <div>
        <section>
          <UploadFile mutation={M.singleUpload} />
        </section>
      </div>
    );
  }
}

export default Upload;
