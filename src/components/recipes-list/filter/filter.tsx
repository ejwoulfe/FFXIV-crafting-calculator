

interface FilterProps {
    setFilterQuery: React.Dispatch<React.SetStateAction<string | null>>,
    sortByQuery: string,
    setSortByQuery: React.Dispatch<React.SetStateAction<string>>
}

function Filter(props: { options: FilterProps }) {

    function sortOptionChanged(event: any) {
        props.options.setSortByQuery(event.target.value);
    }

    function createSortByDropDown(selected: string) {
        let options = ["-", "Recipe Level - Ascending", "Recipe Level - Descending", "Recipe Names A-Z", "Recipe Names Z-A"];


        return (
            <select id="sort-drop-down" onChange={(e) => { sortOptionChanged(e) }}>
                {options.map((text, index) => {
                    if (index.toString() === selected) {
                        return <option key={"option-" + index} selected value={index}>{text}</option>
                    } else {
                        return <option key={"option-" + index} value={index}>{text}</option>
                    }
                })}
            </select>
        )
    }
    return (
        <div id="filter-and-sort">

            <div id="filter-container"></div>
            <div id="sort-by-container">
                <label>Sort By: </label>
                {createSortByDropDown(props.options.sortByQuery)}
            </div>
        </div>
    );
}

export default Filter;