import { Lambda } from 'aws-sdk';

export function invokeLambda(eventObject) {
  return new Promise<any>((resolve, reject) => {
    const lambdaConfig = {
      region: 'ap-southeast-1',
      endpoint: process.env.IS_OFFLINE ? 'http://localhost:8080' : undefined,
    };

    const lambda = new Lambda(lambdaConfig);

    const params = {
      FunctionName: 'MyLambaInvocation',
      Payload: JSON.stringify(eventObject),
    };

    lambda.invoke(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
