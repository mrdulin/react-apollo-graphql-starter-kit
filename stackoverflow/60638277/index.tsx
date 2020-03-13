import React, { FC, useState, useEffect } from 'react';
import { GetTotal } from './getTotal';

interface Props {
  activeTab: string;
}

function handleCount(dates: object, setCount: Function, activeTab?: string) {
  const totalCount = new GetTotal(dates, activeTab);
  setCount(totalCount.totalAttendances());
}

export function handleYearTab(setCount: Function, activeTab: string) {
  if (activeTab === 'Year') {
    handleCount(new Date(), setCount, activeTab);
  }
}

const Content: FC<Props> = ({ activeTab }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    handleYearTab(setCount, activeTab);
  });

  return <div>{count}</div>;
};

export default Content;
