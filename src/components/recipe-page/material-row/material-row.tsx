import highQuality from '../../../assets/ui-icons/hq.png';
import arrowDown from '../../../assets/ui-icons/arrow-down.svg';
import MarketBoardPricesList from '../market-board-prices-list/market-board-prices-list';
import { useEffect, useState } from 'react';

interface MaterialRowProps {
    name: string,
    icon: string,
    quantity: number

}
function MaterialRow(props: { material: MaterialRowProps }) {

    const [showPrices, setShowPrices] = useState<boolean>(false);
    const [highQualityChecked, setHighQualityChecked] = useState<boolean>(false);
    const materialImagesPath = require.context('../../../assets/material-icons/', true);
    const materialName = props.material.name;

    return (
        <>
            <div className="material-row">
                <span className="material-details">
                    <span className="hq-checkbox-container">
                        <label>HQ?</label>
                        <input type="checkbox" className="hq-checkbox" name="hq checkbox" value="hq" onClick={() => setHighQualityChecked(!highQualityChecked)} />
                    </span>
                    <img src={materialImagesPath(`./${props.material.icon}`).default} alt={props.material.name} />
                    <h3>
                        <span className="x-marker">
                            x
                        </span>
                        {props.material.quantity}
                    </h3>
                    <h3 className="material-name">{props.material.name}</h3>
                </span>
                <div className="material-calculations">
                    <span className="hq">
                        <h4>HQ</h4>
                        <span className="calculation-value">
                            <img className="hq-img" src={highQuality} alt="high quality item" />
                        </span>
                    </span>

                    <span className="price-per">
                        <h4>Price Per</h4>
                        <span className="calculation-value">
                            <h4>0</h4>
                        </span>
                    </span>
                    <span className="quantity">
                        <h4>QTY</h4>
                        <span className="calculation-value">
                            <h4>0</h4>
                        </span>
                    </span>
                    <span className="total">
                        <h4>TOTAL</h4>
                        <span className="calculation-value">
                            <h4>0</h4>
                        </span>
                    </span>
                    <span className="arrow">
                        <img className="arrow-svg" src={arrowDown} alt="expand down arrow" onClick={() => setShowPrices(!showPrices)} />
                    </span>
                </div>
            </div>
            {showPrices === true ? <MarketBoardPricesList data={{ materialName, highQualityChecked }} /> : null}
        </>)
}

export default MaterialRow;