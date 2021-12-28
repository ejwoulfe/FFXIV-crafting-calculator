import { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import './pagination.scss';

interface PaginationProps {
    recipesList: Array<RecipeObject>,
    setSlicedRecipesList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>>,
    abortController: AbortController,
    setAbortController: React.Dispatch<React.SetStateAction<AbortController>>,
}

export default function Pagination(props: { data: PaginationProps }) {

    const rowLimit = 100;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(props.data.recipesList.length / rowLimit));

    // Whenever the recipes list changes, either a new disciple or a keyword filter calculate a new totalPages.
    useEffect(() => {
        setTotalPages(Math.ceil(props.data.recipesList.length / rowLimit));
        setCurrentPage(1);
    }, [props.data.recipesList])

    function createPaginationNumbers(totalPages: number, currentPage: number) {
        let pagesArr = [];

        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i);
        }

        return pagesArr.map((pageNumber, index) => {


            if (pageNumber === currentPage) {
                return (
                    <button key={"page-number-" + index} className="button-disabled" value={pageNumber} onClick={(e) => { changePage(e) }}>
                        {pageNumber}
                    </button>
                )
            } else {
                return (
                    <button key={"page-number-" + index} className="button-active" value={pageNumber} onClick={(e) => { changePage(e) }}>
                        {pageNumber}
                    </button>
                )
            }
        })

    }

    function changePage(event: any) {
        props.data.abortController.abort();
        props.data.setAbortController(new AbortController());
        setCurrentPage(parseInt(event.target.value));

        // Starting index will be the page the user clicked on - 1 * 100, and the endIndex is the start index plus the rowLimit, aka 100.
        let startIndex = (parseInt(event.target.value) - 1) * 100;
        let endIndex = startIndex + rowLimit;
        props.data.setSlicedRecipesList(props.data.recipesList.slice(startIndex, endIndex));
    }

    return (
        <>
            <ul id="pagination-container">
                {createPaginationNumbers(totalPages, currentPage)}
            </ul>
        </>
    );
}

