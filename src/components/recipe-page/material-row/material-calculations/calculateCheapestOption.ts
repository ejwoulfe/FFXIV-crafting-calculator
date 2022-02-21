import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(hqRequired: boolean, listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleOptions: Array<Array<MarketObject>> = [];

    /*
      Go through all the listings from the marketboard, if the current items quantity (listOfItems[i]) is not equal to or larger than the target quantity, then we need to go to the next item on the list and add that listings quantity onto our current total quantity and see if that is greater than or equal to the target quantity. We keep doing this until we find enough listings on the market to meet the target quantity.
    */
    for (let i = 0; i < listOfItems.length; i++) {

        let currentQuantity = listOfItems[i].quantity;
        // Adding an index property to each object so we know where in the list they are to highlight them later.
        listOfItems[i].index = i;

        // If the first items quantity is greater than or equal to the target quantity, then just add it to the possible options array and go to the next iteration.
        if (currentQuantity >= targetQuantity) {
            possibleOptions.push([listOfItems[i]]);

        } else {

            // Create an array that will hold all the items the user will need to buy to meet the target quantity.
            let currentOptions = [listOfItems[i]];
            // Loop through the rest of the remaining items on the market adding them to the currentOptions array until we meet the target quantity.
            for (let z = i + 1; z <= listOfItems.length - 1; z++) {

                currentQuantity += listOfItems[z].quantity;
                listOfItems[z].index = z;


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


    // After gathering all the possible purchasing options we need to find the cheapest one.
    let cheapestPrice = null;

    for (let k = 0; k < possibleOptions.length; k++) {
        let totalPrice = 0;

        // Loop through all of the items the user will need to purchase and add up to total by multilpy the price per unit and the quantity of all the items.
        for (let j = 0; j < possibleOptions[k].length; j++) {
            totalPrice += possibleOptions[k][j].total;

        }

        // Whenever we find a new cheapest price, we splice the array from the 0 index up to the index where we found the new price.
        if (cheapestPrice === null || totalPrice < cheapestPrice) {
            cheapestPrice = totalPrice;
            possibleOptions.splice(0, k);
        }


    }

    // Once we have gone through all the possible options, we will have trimmed the array so that the cheapest option will be at the 0 index.
    // So set the array to a length of 1 to trim all other possible options and we will be left with our cheapest and final option.
    possibleOptions.length = 1;

    // Flatten the chosen array in order to return just an array of objects.
    const cheapestOptions = possibleOptions.flat();


    return cheapestOptions;


    console.log('--------------------------------------------');



}