import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(hqRequired: boolean, listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleOptions: Array<Array<MarketObject>> = [];

    for (let i = 0; i < listOfItems.length; i++) {

        let currentQuantity = listOfItems[i].quantity;


        if (currentQuantity >= targetQuantity) {
            possibleOptions.push([listOfItems[i]]);

        } else {

            let currentOptions = [listOfItems[i]];
            for (let z = i + 1; z <= listOfItems.length - 1; z++) {

                currentQuantity += listOfItems[z].quantity;

                if (currentQuantity >= targetQuantity) {

                    currentOptions.push(listOfItems[z]);
                    possibleOptions.push(currentOptions);
                    break;

                } else {

                    currentOptions.push(listOfItems[z]);
                }
            }
        }
    }


    let indexOfCheapestOption = 0;
    let cheapestPrice = null;

    for (let k = 0; k < possibleOptions.length; k++) {

        let totalPrice = 0;
        for (let j = 0; j < possibleOptions[k].length; j++) {

            totalPrice += (possibleOptions[k][j].pricePerUnit * possibleOptions[k][j].quantity);

        }
        if (cheapestPrice === null || totalPrice < cheapestPrice) {

            cheapestPrice = totalPrice;
            indexOfCheapestOption = k;
        }


    }
    console.log("Cheapest Price Found: " + cheapestPrice);
    console.log("Cheapest Price Found At Index: " + indexOfCheapestOption);
    console.log("Options at the Cheapest Price: ");
    console.log(possibleOptions[indexOfCheapestOption]);

    console.log('--------------------------------------------');



}