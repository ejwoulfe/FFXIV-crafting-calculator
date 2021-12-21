import './pagination.scss';

interface PaginationProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    abortController: AbortController
}

export default function Pagination(props: { pageData: PaginationProps }) {

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
        props.pageData.abortController.abort();
        props.pageData.setCurrentPage(parseInt(event.target.value));
    }


    return (
        <>
            <ul id="pagination-container">
                {createPaginationNumbers(props.pageData.totalPages, props.pageData.currentPage)}
            </ul>
        </>
    );
}

