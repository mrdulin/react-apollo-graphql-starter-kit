import React from 'react';

import Tooltip from '../../components/Tooltip';

const About = () => (
  <div>
    <h2>About</h2>
    <Tooltip text="testtesttest" icon={<span>😄</span>}>
      label
    </Tooltip>
  </div>
);

export default About;
