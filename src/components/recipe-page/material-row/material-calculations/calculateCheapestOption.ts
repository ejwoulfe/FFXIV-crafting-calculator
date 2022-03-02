import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleCombinations: Array<Array<MarketObject>> = [];
    const trimmedList = [];
    for (let i = 0; i < listOfItems.length; i++) {
        let currentQuantity = listOfItems[i].quantity;
        listOfItems[i].index = i;
        if (currentQuantity >= targetQuantity) {
            possibleCombinations.push([listOfItems[i]]);
        } else {
            trimmedList.push(listOfItems[i]);
        }
    }
    for (let k = 0; k < trimmedList.length; k++) {
        // console.log("-------------------");
        // console.log("Position k: " + k);
        // console.log("-------------------");

        let currentQuantity = trimmedList[k].quantity;
        let currentCombinations = [trimmedList[k]];
        for (let z = k + 1; z <= trimmedList.length - 1; z++) {
            // console.log("Position z: " + z);

            currentQuantity += trimmedList[z].quantity;
            // console.log("The Current Quantity is: ");
            // console.log(currentQuantity);
            if (currentQuantity >= targetQuantity) {
                currentCombinations.push(trimmedList[z]);
                // console.log("Current Combinations after push: ");
                // console.log(JSON.parse(JSON.stringify(currentCombinations)));
                possibleCombinations.push([...currentCombinations]);
                // console.log("Pushed");
                // console.log("Possible Combinations after push: ");
                // console.log(JSON.parse(JSON.stringify(possibleCombinations)));
                currentCombinations.pop();
                // console.log("Current Combinations after pop: ");
                //console.log(JSON.parse(JSON.stringify(currentCombinations)));
                currentQuantity -= trimmedList[z].quantity;
            } else if (z < trimmedList.length - 1) {
                currentCombinations.push(trimmedList[z]);
            }
            if (z === trimmedList.length - 1 && currentCombinations.length > 1) {
                let num = currentCombinations.length - 1;
                // console.log("end current combinations: ");
                // console.log(JSON.parse(JSON.stringify(currentCombinations)));
                // console.log("length of current combinations");
                // console.log(currentCombinations.length);
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