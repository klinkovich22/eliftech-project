import React from 'react';
import cx from 'classnames';
import { CONSTANTS } from '../../constants';
import styles from './Pagination.module.css'

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const rangeHelper = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const fetchPageNumbers = (totalPages, currentPage) => {
  const pageNeighbours = CONSTANTS.PAGE_NEIGHBOURS;

  const totalNumbers = (pageNeighbours * 2) + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = rangeHelper(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case (hasLeftSpill && !hasRightSpill): {
        const extraPages = rangeHelper(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      case (!hasLeftSpill && hasRightSpill): {
        const extraPages = rangeHelper(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      case (hasLeftSpill && hasRightSpill):
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return rangeHelper(1, totalPages);
}


const Pagination = (props) => {

  const { totalPages, currentPage } = props;
  const pages = fetchPageNumbers(totalPages, currentPage);

  const gotoPage = page => {
    const currentPage = Math.max(1, Math.min(page, totalPages));
    props.setCurrentPage(currentPage)
  }
  
  const handleClick = page => event => {
    event.preventDefault();
    gotoPage(page);
  }
  
  const handleMoveLeft = event => {
    event.preventDefault();
    gotoPage(currentPage - 1);
  }
  
  const handleMoveRight = event => {
    event.preventDefault();
    gotoPage(currentPage + 1);
  }
  

  return (
    <section>
      {
        (!totalPages || totalPages === 1) ? null :
          <nav>
            <ul className={styles["pagination"]}>
              {pages.map((page, index) => {
                if (page === LEFT_PAGE) return (
                  <li key={index} className={styles["page-item"]}>
                    <a className={styles["page-link"]} href="#" aria-label="Previous" onClick={handleMoveLeft}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                );

                if (page === RIGHT_PAGE) return (
                  <li key={index} className={styles["page-item"]}>
                    <a className={styles["page-link"]} href="#" aria-label="Next" onClick={handleMoveRight}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                );

                return (
                  <li key={index} className={cx(styles["page-item"], {
                    [styles["active"]]: currentPage === page
                  })}>
                    <a className={styles["page-link"]} href="#" onClick={handleClick(page)}>{page}</a>
                  </li>
                );

              })}
            </ul>
          </nav>

      }

    </section>
  );
}

export default Pagination;
