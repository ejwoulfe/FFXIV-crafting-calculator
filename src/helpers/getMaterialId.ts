interface MarketItemObject {
    ID: number,
    Icon: string,
    Name: string,
    Url: string,
    UrlType: string,
    additionalProperties: { [prop: string]: string };
}
interface FetchObject {
    Pagination: object,
    Results: Array<MarketItemObject>,
    SpeedMS: number
}


export default function getMaterialID(fetchObject: FetchObject) {

    return fetchObject.Results.map((item) => {

        if (item.UrlType === "Item") {
            return item.ID
        } else {
            return null;
        }
    })
}