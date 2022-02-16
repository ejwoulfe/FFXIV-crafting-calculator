import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(hqRequired: boolean, listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleOptions = [];
    console.log('--------------------------------------------');
    for (let i = 0; i < listOfItems.length; i++) {

        // if (i !== 0) {
        //     console.log("Next iteration.")
        // }


        // console.log("Target Quantity: ")
        // console.log(targetQuantity)

        let currentQuantity = listOfItems[i].quantity;
        // console.log("current quantity: ")
        // console.log(currentQuantity)


        if (currentQuantity >= targetQuantity) {
            possibleOptions.push(listOfItems[i]);

        } else {

            let currentOptions = [listOfItems[i]];
            for (let z = i + 1; z < listOfItems.length - 1; z++) {
                console.log("The Current list index: ")
                console.log(i)
                currentQuantity += listOfItems[z].quantity;
                if (currentQuantity >= targetQuantity) {
                    currentOptions.push(listOfItems[z]);
                    possibleOptions.push(currentOptions);
                    // console.log("pushing")
                    // console.log(currentOptions)
                    // console.log("result")
                    // console.log(purchaseOptions)
                    break;
                } else {

                    currentOptions.push(listOfItems[z]);
                }

            }

        }


    }

    console.log("FINAL ARRAY: ")
    console.log(possibleOptions)

    console.log('--------------------------------------------');



}