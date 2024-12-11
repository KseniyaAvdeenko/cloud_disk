import React, {FC} from 'react';
import {IIconProps} from "../../interface/IIconProps";

const DownloadIcon: FC<IIconProps> = ({bg}) => {
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 8.5V17ZM10 17L13 14ZM10 17L7.00002 14ZM6.00002 4.036C6.74797 4.14413 7.44083 4.49143 7.97502 5.026ZM15.5 11C17.019 11 18 9.769 18 8.25C18 7.64862 17.8028 7.06383 17.4387 6.58521C17.0746 6.10659 16.5636 5.76052 15.984 5.6C15.8948 4.47846 15.43 3.41977 14.6647 2.5951C13.8994 1.77042 12.8783 1.22797 11.7665 1.05543C10.6547 0.882892 9.51727 1.09036 8.53801 1.64429C7.55874 2.19822 6.79491 3.06624 6.37002 4.108C5.47544 3.86002 4.519 3.97757 3.71109 4.43479C2.90318 4.892 2.30999 5.65143 2.06202 6.546C1.81404 7.44058 1.93159 8.39702 2.3888 9.20493C2.84601 10.0128 3.60544 10.606 4.50002 10.854"
                fill={bg}/>
            <path
                d="M10 8.5V17M10 17L13 14M10 17L7.00002 14M6.00002 4.036C6.74797 4.14413 7.44083 4.49143 7.97502 5.026M15.5 11C17.019 11 18 9.769 18 8.25C18 7.64862 17.8028 7.06383 17.4387 6.58521C17.0746 6.10659 16.5636 5.76052 15.984 5.6C15.8948 4.47846 15.43 3.41977 14.6647 2.5951C13.8994 1.77042 12.8783 1.22797 11.7665 1.05543C10.6547 0.882892 9.51727 1.09036 8.53801 1.64429C7.55874 2.19822 6.79491 3.06624 6.37002 4.108C5.47544 3.86002 4.519 3.97757 3.71109 4.43479C2.90318 4.892 2.30999 5.65143 2.06202 6.546C1.81404 7.44058 1.93159 8.39702 2.3888 9.20493C2.84601 10.0128 3.60544 10.606 4.50002 10.854"
                stroke={bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default DownloadIcon;
