import React, {FC} from 'react';
import {IIconProps} from "../../interface/IIconProps";

const RowIcon: FC<IIconProps> = ({bg}) => {
    return (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.808004 10.2752C0.579338 10.2752 0.387337 10.2055 0.232004 10.0662C0.0773375 9.9262 4.27351e-06 9.75321 4.27351e-06 9.54717V8.17763C4.27351e-06 7.9722 0.0773375 7.7995 0.232004 7.65954C0.386671 7.51959 0.578671 7.44991 0.808004 7.45051H15.192C15.4213 7.45051 15.6133 7.52019 15.768 7.65954C15.9227 7.7989 16 7.9719 16 8.17853V9.54717C16 9.75321 15.9227 9.9262 15.768 10.0662C15.6133 10.2061 15.4213 10.2758 15.192 10.2752H0.808004ZM0.808004 6.54949C0.579338 6.54949 0.387337 6.47981 0.232004 6.34046C0.0766708 6.2011 -0.000662393 6.0281 4.27351e-06 5.82147V4.45283C4.27351e-06 4.24679 0.0773375 4.0741 0.232004 3.93474C0.386671 3.79538 0.578671 3.72571 0.808004 3.72571H15.192C15.4213 3.72571 15.6133 3.79538 15.768 3.93474C15.9227 4.0741 16 4.24679 16 4.45283V5.82237C16 6.0284 15.9227 6.2011 15.768 6.34046C15.6133 6.47981 15.4213 6.54949 15.192 6.54949H0.808004ZM0.808004 2.82469C0.579338 2.82469 0.387337 2.75471 0.232004 2.61475C0.0766708 2.47479 -0.000662393 2.3021 4.27351e-06 2.09667V0.727121C4.27351e-06 0.521088 0.0773375 0.348393 0.232004 0.209036C0.386671 0.0696785 0.578671 0 0.808004 0H15.192C15.4213 0 15.6133 0.0696785 15.768 0.209036C15.9227 0.348393 16 0.521389 16 0.728022V2.09667C16 2.3027 15.9227 2.47539 15.768 2.61475C15.6133 2.75411 15.4213 2.82409 15.192 2.82469H0.808004ZM0.808004 14C0.579338 14 0.387337 13.9303 0.232004 13.791C0.0766708 13.6516 -0.000662393 13.4789 4.27351e-06 13.2729V11.9033C4.27351e-06 11.6973 0.0773375 11.5246 0.232004 11.3853C0.386671 11.2459 0.578671 11.1759 0.808004 11.1753H15.192C15.4213 11.1753 15.6133 11.2453 15.768 11.3853C15.9227 11.5252 16 11.6979 16 11.9033V13.2729C16 13.4789 15.9227 13.6516 15.768 13.791C15.6133 13.9303 15.4213 14 15.192 14H0.808004Z"
                fill={bg}/>
        </svg>
    );
};

export default RowIcon;
