import { Controller } from './controller';

const func = async (ctx) => {
  const data = await Controller.fetchResults(ctx.req.url);
  // do some logic
  return { ...data };
};

export { func };
