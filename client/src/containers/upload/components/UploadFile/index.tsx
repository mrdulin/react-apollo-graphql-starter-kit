import React, { PureComponent } from 'react';
import { Mutation, FetchResult } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { DataProxy } from 'apollo-cache';
import * as PT from 'prop-types';

import * as Q from 'gqlMod/queries/upload.gql';

interface IUploadProps {
  mutation: DocumentNode;
  multiple?: boolean;
}

class UploadFile extends PureComponent<IUploadProps> {
  public static propTypes = {
    mutation: PT.object,
    multiple: PT.bool
  };

  public render() {
    const { mutation, multiple } = this.props;
    return (
      <Mutation
        mutation={mutation}
        update={(proxy: DataProxy, mutationResult: FetchResult<any>) => {
          const data: any = proxy.readQuery({ query: Q.uploads });
          let newUploads: any[] = [];
          if (multiple) {
            newUploads = mutationResult.data.multipleUpload;
          } else {
            newUploads = [mutationResult.data.singleUpload];
          }
          data.uploads = data.uploads.concat(newUploads);
          proxy.writeQuery({ query: Q.uploads, data });
        }}>
        {uploadFile => {
          return <input type="file" multiple={multiple} required onChange={e => this.onChange(e, uploadFile)} />;
        }}
      </Mutation>
    );
  }

  private onChange(e: React.SyntheticEvent<HTMLInputElement>, uploadFile: any) {
    const {
      currentTarget: { validity, files }
    } = e;

    if (validity.valid && files) {
      if (files.length > 1) {
        uploadFile({ variables: { files } });
      } else {
        const file = files[0];
        uploadFile({ variables: { file } });
      }
    }
  }
}

export { UploadFile };
