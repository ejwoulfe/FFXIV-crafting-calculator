import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changePage } from '../../../redux/reducers/page-slice';
import './pagination.scss';

interface PaginationProps {
    totalRecipes: number,
    abortController: AbortController,
}

export default function Pagination(props: { data: PaginationProps }) {
    // Redux
    const dispatch = useDispatch();
    const rowLimit = 100;
    const page = useSelector((state: RootState) => state.pageData.page);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        setTotalPages(Math.ceil(props.data.totalRecipes / rowLimit))
        dispatch(changePage(1));
    }, [props.data.totalRecipes, dispatch]);

    // Array that will hold the page numbers, updating every 5 pages.
    function createPaginationNumbers(totalPages: number, currentPage: number) {

        const pagesPerSection = 5;
        // Variable to hold the starting position of our page numbers array.
        let start =
            Math.floor((currentPage - 1) / pagesPerSection) * pagesPerSection;
        if (totalPages < pagesPerSection) {
            /* If the total amount of pages will be less than our defined desired amount of pages(pagesPerSection),
             *  then only fill the array up to the available pages.
             * i.e. 130 recipes total will only fill up 2 pages. So only make pages 1 and 2.
             */
            return new Array(totalPages).fill(0).map((value, index) => {
                value = index + 1;
                return value;
            });
        } else if (start + pagesPerSection >= totalPages) {
            /* If the starting position + the desired amount of pages total will be larger than our total pages available,
             * then only fill the array with the total pages - our starting position.
             * i.e. 66 Total Pages available, so no need to fill the array from 66 to 70.
             * only do page 66.
             */
            return new Array(totalPages - start).fill(0).map((value, index) => {
                value = start + index + 1;
                return value;
            });
        } else {
            // If total pages exceeds pagesPerSection, fill the array with the according 5 numbers.
            return new Array(pagesPerSection).fill(0).map((value, index) => {
                value = start + index + 1;
                return value;
            });
        }
    }

    function pageNumberClicked(buttonNumber: string) {
        props.data.abortController.abort();
        let value = parseInt(buttonNumber)
        dispatch(changePage(value));
    }
    function goToPreviousPage() {
        props.data.abortController.abort();
        dispatch(changePage(page - 1))
    }
    function goToNextPage() {
        props.data.abortController.abort();
        dispatch(changePage(page + 1))
    }
    function goToFirstPage() {
        props.data.abortController.abort();
        dispatch(changePage(1));
    }
    function goToLastPage() {
        props.data.abortController.abort();
        dispatch(changePage(totalPages));
    }

    return (
        <>
            <ul id="pagination-container">
                {page > 1 ? (
                    <button id="first-page-button" onClick={() => { goToFirstPage() }}>
                        <b>{`<<`}</b>
                    </button>
                ) : (
                    <button id="first-page-disabled" disabled>
                        <b>{`<<`}</b>
                    </button>
                )}
                {page > 1 ? (
                    <button id="prev-button" onClick={() => { goToPreviousPage() }}>
                        <b>{`<`}</b>
                    </button>
                ) : (
                    <button id="prev-disabled" disabled>
                        <b>{`<`}</b>
                    </button>
                )}
                {createPaginationNumbers(totalPages, page).map((value, index) => (
                    <button
                        key={index}
                        className={`${page === value ? "button-disabled" : ""}`}
                        onClick={() => pageNumberClicked(value)}              >
                        {value}
                    </button>
                ))}
                {page !== totalPages ? (
                    <button id="next-button" onClick={() => { goToNextPage() }}>
                        <b>{`>`}</b>
                    </button>
                ) : (
                    <button id="next-disabled" disabled>
                        <b>{`>`}</b>
                    </button>
                )}
                {page !== totalPages ? (
                    <button id="last-page-button" onClick={() => { goToLastPage() }}>
                        <b>{`>>`}</b>
                    </button>
                ) : (
                    <button id="last-page-disabled" disabled>
                        <b>{`>>`}</b>
                    </button>
                )}
            </ul>
        </>
    );
}

