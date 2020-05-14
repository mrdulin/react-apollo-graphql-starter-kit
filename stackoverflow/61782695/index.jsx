import React, { useRef } from 'react';

export default function Child2() {
  const divRef = useRef();

  function getDivWidth() {
    if (divRef.current) {
      console.log(divRef.current);
    }
    return divRef.current ? divRef.current.offsetWidth : '';
  }

  function getDivText() {
    const divWidth = getDivWidth();

    if (divWidth) {
      if (divWidth > 100) {
        return 'ABC';
      }
      return '123';
    }

    return '123';
  }

  return (
    <>
      <div id="myDiv" ref={divRef}>
        {getDivText()}
      </div>
      <p>Div width is: {getDivWidth()}</p>
    </>
  );
}
