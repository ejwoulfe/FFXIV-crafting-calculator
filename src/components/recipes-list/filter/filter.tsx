import { useDispatch } from "react-redux";
import createDropDown from "../../dropdown";
import { keywordSubmitted, changeSortNumber } from "../../../redux/reducers/recipes-slice";
import "./filter.scss";

interface FilterProps {
  abortController: AbortController;
  setAbortController: React.Dispatch<React.SetStateAction<AbortController>>;
}

function Filter(props: { data: FilterProps }) {
  const dispatch = useDispatch();

  function sortOptionChanged(event: any) {
    dispatch(changeSortNumber(parseInt(event.target.value)));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, formatSearchTerm: Function) {
    event.preventDefault();
    let target = event.target as HTMLFormElement;
    let keyword = formatSearchTerm(target.keyword.value);

    dispatch(keywordSubmitted(keyword));
  }

  function formatSearchTerm(searchTerm: string) {
    const searchFormat = searchTerm
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return searchFormat;
  }

  return (
    <div id="filter-and-sort">
      <div id="filter-container">
        <label>Keyword: </label>
        <form
          id="filter-form"
          onSubmit={(e) => {
            handleSubmit(e, formatSearchTerm);
          }}>
          <input
            id="filter-bar"
            autoComplete="false"
            type="text"
            name="keyword"
            placeholder="SEARCH BY KEYWORD..."
          />
          <input id="filter-button" type="submit" value="" />
        </form>
      </div>
      <div id="sort-by-container">
        <label>Sort By: </label>
        {createDropDown(
          [
            "-",
            "Recipe Level - Ascending",
            "Recipe Level - Descending",
            "Recipe Names A-Z",
            "Recipe Names Z-A",
          ],
          sortOptionChanged
        )}
      </div>
    </div>
  );
}

export default Filter;
