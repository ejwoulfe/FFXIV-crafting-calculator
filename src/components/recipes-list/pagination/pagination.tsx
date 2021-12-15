import { useEffect, useState } from 'react';
import './pagination.scss';

interface PaginationProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number
}

export default function Pagination(data: { pageData: PaginationProps }) {

    let page = data.pageData;

    console.log(data)


    function createPaginationNumbers(totalPages: number, currentPage: number) {
        let pagesArr = [];
        console.log("called.")

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

        page.setCurrentPage(event.target.innerHTML as number);
    }


    return (
        <div>
            <ul id="pagination-container" onClick={(e) => { changePage(e) }}>
                {createPaginationNumbers(page.totalPages, page.currentPage)}
            </ul>
        </div>
    );
}

