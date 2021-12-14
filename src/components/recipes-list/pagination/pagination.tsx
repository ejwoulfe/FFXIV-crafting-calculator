import { useEffect } from "react";
import './pagination.scss';

interface PaginationProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number
}

export default function Pagination(data: { pageData: PaginationProps }) {

    let page = data.pageData;

    function createPaginationNumbers(totalPages: number) {
        let pagesArr = [];
        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i);
        }
        return pagesArr.map((pageNumber, index) => {
            return <li key={"page-number-" + index}>{pageNumber}</li>
        })
    }

    function changePage(event: any) {
        page.setCurrentPage(event.target.innerHTML as number);
    }


    return (
        <div>
            <ul id="pagination-container" onClick={(e) => { changePage(e) }}>
                {createPaginationNumbers(page.totalPages)}
            </ul>
        </div>
    );
}

