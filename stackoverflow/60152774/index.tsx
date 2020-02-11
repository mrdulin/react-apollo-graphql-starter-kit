import React from 'react';
import FirstComponent from './first';
import SecondComponent from './second';

type States = any;

const Choice: React.FC<States> = (props) => {
  function getChoiceComponent(): JSX.Element {
    if (props.choices) {
      return <FirstComponent {...props} />;
    } else {
      return <SecondComponent {...props} />;
    }
  }

  return <>{getChoiceComponent()}</>;
};

export default Choice;
