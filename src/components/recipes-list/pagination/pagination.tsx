import { useEffect, useState } from "react";

import "./pagination.scss";

interface PaginationProps {
    changePage: any,
    currentPage: number,
    dataLimit: number,
    numberOfRecipes: number
}

function Pagination(props: PaginationProps) {
    const [totalPages, setTotalPages] = useState(
        Math.ceil(props.numberOfRecipes / props.dataLimit)
    );

    useEffect(() => {
        setTotalPages(Math.ceil(props.numberOfRecipes / props.dataLimit));
    }, [props.numberOfRecipes, props.dataLimit]);

    function goToNextPage() {
        props.changePage(props.currentPage + 1);
    }

    function goToPreviousPage() {
        props.changePage(props.currentPage - 1);
    }

    function changeCurrentPage(event: React.MouseEvent<HTMLElement>) {
        const pageNumber = Number(event.currentTarget.innerHTML);
        props.changePage(pageNumber);
    }

    // Array that will hold the page numbers, updating every 5 pages.
    function createPageNumbers() {
        const pagesPerSection = 5;
        // Variable to hold the starting position of our page numbers array.
        let start =
            Math.floor((props.currentPage - 1) / pagesPerSection) * pagesPerSection;
        if (totalPages < pagesPerSection) {
            /* If the total amount of pages will be less than our defined desired amount of pages(pagesPerSection),
             *  then only fill the array up to the available pages.
             * i.e. 30 airlines total will only fill up 2 pages. So only make pages 1 and 2.
             */
            return new Array(totalPages).map((value, index) => {
                value = index + 1;
                return value;
            });
        } else if (start + pagesPerSection >= totalPages) {
            /* If the starting position + the desired amount of pages total will be larger than our total pages available,
             * then only fill the array with the total pages - our starting position.
             * i.e. 66 Total Pages available, so no need to fill the array from 66 to 70.
             * only do page 66.
             */
            return new Array(totalPages - start).map((value, index) => {
                value = start + index + 1;
                return value;
            });
        } else {
            // If total pages exceeds pagesPerSection, fill the array with the according 5 numbers.
            return new Array(pagesPerSection).map((value, index) => {
                value = start + index + 1;
                return value;
            });
        }
    }

    return (
        <div id="pagination">
            {/* <div id="pagination-buttons">
                {props.currentPage > 1 ? (
                    <button
                        onClick={() => {
                            goToPreviousPage();
                        }}
                    >
                        <b>{`<`}</b>
                    </button>
                ) : (
                    <button className="prev_disabled" disabled>
                        <b>{`<`}</b>
                    </button>
                )}
                {createPageNumbers().map((value, index) => (
                    <button
                        key={index}
                        className={`page_${props.currentPage === value ? "disabled" : "acitve"}`}
                        onClick={(e) => changeCurrentPage(e)}
                    >
                        {value}
                    </button>
                ))}

                {props.currentPage !== totalPages ? (
                    <button
                        onClick={() => {
                            goToNextPage();
                        }}
                    >
                        <b>{`>`}</b>
                    </button>
                ) : (
                    <button className="next_disabled" disabled>
                        <b>{`>`}</b>
                    </button>
                )}
            </div> */}
        </div>
    );
}
export default Pagination;
