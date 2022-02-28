import MarketObject from "../../../../interfaces/market-object"
export default function calculateCheapestOption(hqRequired: boolean, listOfItems: Array<MarketObject>, targetQuantity: number) {

    const possibleOptions: Array<Array<MarketObject>> = [];

    // function calculateCheapestCombination(listOfItems, targetQuantity) {
    //     const possibleCombinations = [];
    //     const trimmedList = [];
    //     for (let i = 0; i < listOfItems.length; i++) {
    //         let currentQuantity = listOfItems[i].quantity;
    //         if (currentQuantity >= targetQuantity) {
    //             possibleCombinations.push([listOfItems[i]]);
    //         } else {
    //             trimmedList.push(listOfItems[i]);
    //         }
    //     }
    //     for (let k = 0; k < trimmedList.length; k++) {
    //         let currentQuantity = trimmedList[k].quantity;
    //         let currentCombinations = [trimmedList[k]];
    //         for (let z = k + 1; z <= trimmedList.length - 1; z++) {
    //             currentQuantity += trimmedList[z].quantity;
    //             if (currentQuantity >= targetQuantity) {
    //                 possibleCombinations.push(currentCombinations);
    //             } else {
    //                 currentCombinations.push(trimmedList[z]);
    //             }
    //         }
    //     }
    //     console.log(possibleCombinations);
    //     return 0;
    // }

    // let item1 = {
    //     pricePerUnit: 8,
    //     quantity: 1,
    //     total: 8
    // };
    // let item2 = {
    //     pricePerUnit: 10,
    //     quantity: 15,
    //     total: 150
    // };
    // let item3 = {
    //     pricePerUnit: 11,
    //     quantity: 1,
    //     total: 11
    // };
    // let item4 = {
    //     pricePerUnit: 14,
    //     quantity: 1,
    //     total: 14
    // };
    // let item5 = {
    //     pricePerUnit: 15,
    //     quantity: 3,
    //     total: 45
    // };
    // let item6 = {
    //     pricePerUnit: 16,
    //     quantity: 2,
    //     total: 32
    // };
    // let item7 = {
    //     pricePerUnit: 17,
    //     quantity: 1,
    //     total: 17
    // };
    // let item8 = {
    //     pricePerUnit: 20,
    //     quantity: 1,
    //     total: 20
    // };

    // const items = [item1, item2, item3, item4, item5, item6, item7, item8];

    // calculateCheapestCombination(items, 3);




}