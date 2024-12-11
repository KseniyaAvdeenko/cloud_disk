import React, {FC} from 'react';
import {IIconSizedProps} from "../../interface/IIconProps";

const DirectoryIcon: FC<IIconSizedProps> = ({size, bg}) => {
    return size === 'small' ? (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2H10L8 0Z"
                fill={bg}/>
        </svg>
    ) : (
        <svg width="61" height="49" viewBox="0 0 61 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.4 0H6.1C2.745 0 0.0305 2.745 0.0305 6.1L0 42.7C0 46.055 2.745 48.8 6.1 48.8H54.9C58.255 48.8 61 46.055 61 42.7V12.2C61 8.845 58.255 6.1 54.9 6.1H30.5L24.4 0Z"
                fill={bg}/>
        </svg>)
};

export default DirectoryIcon;
