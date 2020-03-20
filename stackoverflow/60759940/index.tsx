import React from 'react';
import { NextSeo } from './next-seo';

type Props = any;
const Meta = (props: Props) => {
  const appMeta = { title: '', description: '' };
  return (
    <NextSeo
      title={props.title === 'Homepage' ? appMeta.title : props.title}
      description={props.title === 'Homepage' ? appMeta.description : props.description}
    />
  );
};

export default Meta;
