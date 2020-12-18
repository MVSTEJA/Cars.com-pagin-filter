import React, { useState, useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import { GlobalContext } from '../../context/GlobalState';

const Purchase: React.FunctionComponent<any> = () => {
  const [state, setState] = useState<any>({
    firstDisabled: true,
    prevDisabled: true,
    nextDisabled: false,
    lastDisabled: false,
  });
  const {
    page, totalPageCount, setPageNo, setDisplayCars,
  } = useContext(
    GlobalContext,
  );

  const handleSelectPagination = (evt: React.SyntheticEvent) => {
    const { textContent, classList } = evt.target as HTMLDivElement;

    if (!classList.contains('disabled')) {
      const pageNumberType = Number(page);
      const calculatePageNumber: { [key: string]: (page: number) => number } = {
        First: (): number => 1,
        Previous: (page: number): number => page - 1,
        Next: (page: number): number => page + 1,
        Last: (): number => totalPageCount!,
      };
      const toSetPageNo = calculatePageNumber[textContent!](pageNumberType);

      if (Number(toSetPageNo) === 1) {
        setState({ firstDisabled: true, prevDisabled: true });
      } else if (Number(toSetPageNo) === totalPageCount) {
        setState({ nextDisabled: true, lastDisabled: true });
      } else {
        setState({
          firstDisabled: false,
          prevDisabled: false,
          nextDisabled: false,
          lastDisabled: false,
        });
      }

      setPageNo && setPageNo(String(toSetPageNo));
      setDisplayCars && setDisplayCars({ page: toSetPageNo });
    }
  };

  return (
    <Pagination
      className="mt-3 d-flex justify-content-center"
      onClick={handleSelectPagination}
    >
      <Pagination.Item disabled={state.firstDisabled}>First</Pagination.Item>
      <Pagination.Item disabled={state.prevDisabled}>Previous</Pagination.Item>
      <Pagination.Item disabled>Page {page} of 20</Pagination.Item>
      <Pagination.Item disabled={state.nextDisabled}>Next</Pagination.Item>
      <Pagination.Item disabled={state.lastDisabled}>Last</Pagination.Item>
    </Pagination>
  );
};

export default Purchase;
