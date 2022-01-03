export default function createDropDown(options: Array<string>, onChangeFunction: Function) {

    return (
        <select id="sort-drop-down" onChange={(e) => { onChangeFunction(e) }}>
            {options.map((text, index) => {

                return <option key={"option-" + index} value={index}>{text}</option>

            })}
        </select>
    )
}

