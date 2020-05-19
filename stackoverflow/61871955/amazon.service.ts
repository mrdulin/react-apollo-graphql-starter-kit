import * as AWS from 'aws-sdk';

export class AmazonService {
  parameterStore: AWS.SSM;

  constructor() {
    this.parameterStore = new AWS.SSM();
  }

  async getParam(param) {
    let self = this;
    console.log('IN getPARAM', param);
    return new Promise(function (resolve, reject) {
      self.parameterStore.getParameter(
        {
          Name: param,
          WithDecryption: true,
        },
        function (err, data) {
          if (err) {
            console.log('Error ', err);
            return resolve({ Error: 'ParameterNotFound' });
          }
          console.log('RES ', data.Parameter!.Value);
          return resolve(data.Parameter!.Value);
        },
      );
    });
  }
}
