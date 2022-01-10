import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changePage } from '../../../redux/reducers/page-slice';
import './pagination.scss';

interface PaginationProps {
    totalRecipes: number,
    abortController: AbortController,
    setAbortController: React.Dispatch<React.SetStateAction<AbortController>>,
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
    }, [props.data.totalRecipes]);

    function createPaginationNumbers(totalPages: number, currentPage: number) {
        let pagesArr = [];

        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i);
        }

        return pagesArr.map((pageNumber, index) => {


            if (pageNumber === currentPage) {
                return (
                    <button disabled key={"page-number-" + index} className="button-disabled" value={pageNumber} onClick={(e) => { pageNumberClicked(e) }}>
                        {pageNumber}
                    </button>
                )
            } else {
                return (
                    <button key={"page-number-" + index} className="button-active" value={pageNumber} onClick={(e) => { pageNumberClicked(e) }}>
                        {pageNumber}
                    </button>
                )
            }
        })

    }

    function pageNumberClicked(event: any) {
        let value = parseInt(event.target.value)
        dispatch(changePage(value));
    }

    return (
        <>
            <ul id="pagination-container">
                {createPaginationNumbers(totalPages, page)}
            </ul>
        </>
    );
}

