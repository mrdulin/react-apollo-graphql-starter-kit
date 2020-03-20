import Meta from './';
import React from 'react';
import { mount } from 'enzyme';

jest.mock('./next-seo', () => ({
  NextSeo: (props) => (
    <div>
      {props.title} {props.description}
    </div>
  ),
}));

describe('<ContactUs/>', () => {
  it('can render with default props', () => {
    const ContactUsWrapper = mount(<Meta title="title" description="description" />);
    expect(ContactUsWrapper).toMatchSnapshot();
  });
});
