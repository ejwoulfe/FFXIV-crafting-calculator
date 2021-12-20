import { useEffect, useState } from 'react';
import './pagination.scss';

interface PaginationProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    isDoneLoading: boolean
}

export default function Pagination(data: { pageData: PaginationProps }) {

    let page = data.pageData;

    function createPaginationNumbers(totalPages: number, currentPage: number) {
        let pagesArr = [];

        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i);
        }

        return pagesArr.map((pageNumber, index) => {


            if (pageNumber === currentPage) {
                return <button key={"page-number-" + index} className="page-disabled" >{pageNumber}</button>
            } else {
                return <button key={"page-number-" + index} className="page-active"> {pageNumber}</button>
            }
        })
    }

    function changePage(event: any) {


        if (data.pageData.isDoneLoading === true) {
            page.setCurrentPage(event.target.innerHTML as number);
        }
    }


    return (
        <div>
            <ul id="pagination-container" onClick={(e) => { changePage(e) }}>
                {createPaginationNumbers(page.totalPages, page.currentPage)}
            </ul>
        </div>
    );
}

