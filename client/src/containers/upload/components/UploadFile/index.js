import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as PT from 'prop-types';

class UploadFile extends Component {
  static propTypes = {
    mutation: PT.object
  };
  onChange(e, uploadFile) {
    console.log(e.nativeEvent, uploadFile);
    const { nativeEvent } = e;
    const {
      target: { validity, files }
    } = nativeEvent;
    const file = files[0];
    if (validity.valid) {
      uploadFile({ variables: { file } });
    }
  }
  render() {
    const { mutation } = this.props;
    return (
      <Mutation mutation={mutation}>
        {uploadFile => {
          return <input type="file" required onChange={e => this.onChange(e, uploadFile)} />;
        }}
      </Mutation>
    );
  }
}

export default UploadFile;
