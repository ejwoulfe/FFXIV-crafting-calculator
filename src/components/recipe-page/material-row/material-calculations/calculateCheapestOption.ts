import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleCombinations: Array<Array<MarketObject>> = [];
    const trimmedList = [];
    // Go through the market listings and find the ones that have a quantity equal to or larger than the target quantity.
    // This is to reduce the number of total combinations the algorithm will gather in the next section and reduce unnecessary iterations.
    for (let i = 0; i < listOfItems.length; i++) {
        let currentQuantity = listOfItems[i].quantity;
        // Adding an index property to all the objects to help detect where they are on the list in order to highlight them on the UI later.
        listOfItems[i].index = i;
        if (currentQuantity >= targetQuantity) {
            possibleCombinations.push([listOfItems[i]]);
        } else {
            trimmedList.push(listOfItems[i]);
        }
    }

    for (let k = 0; k < trimmedList.length; k++) {

        let currentQuantity = trimmedList[k].quantity;
        let currentCombinations = [trimmedList[k]];
        for (let z = k + 1; z <= trimmedList.length - 1; z++) {


            currentQuantity += trimmedList[z].quantity;

            if (currentQuantity >= targetQuantity) {

                currentCombinations.push(trimmedList[z]);
                possibleCombinations.push([...currentCombinations]);
                currentCombinations.pop();
                currentQuantity -= trimmedList[z].quantity;

            } else if (z < trimmedList.length - 1) {

                currentCombinations.push(trimmedList[z]);
            }
            if (z === trimmedList.length - 1 && currentCombinations.length > 1) {

                let num = currentCombinations.length - 1;
                z = currentCombinations[num].index;
                currentCombinations.pop();
                currentQuantity = currentCombinations.reduce((prev, current) => {
                    return prev + current.quantity;
                }, 0)
            }
        }
    }
    return getCheapestOption(possibleCombinations);


}

// Helper function that will go through all of the possible combinations found and find the cheapest one.
function getCheapestOption(listOfCombinations: Array<Array<MarketObject>>) {
    let cheapestOption: Array<MarketObject> = [];
    let cheapestPrice = null;
    for (let i = 0; i < listOfCombinations.length; i++) {
        let currentTotalPrice = 0;

        for (let j = 0; j < listOfCombinations[i].length; j++) {
            currentTotalPrice += (listOfCombinations[i][j].total);
        }
        if (cheapestPrice === null || currentTotalPrice < cheapestPrice) {
            cheapestPrice = currentTotalPrice;
            cheapestOption = (listOfCombinations[i]);
        }

    }

    return cheapestOption;


}