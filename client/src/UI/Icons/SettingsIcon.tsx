import React, {FC} from 'react';
import {IIconProps} from "../../interface/IIconProps";

const SettingsIcon: FC<IIconProps> = ({bg}) => {
    return (
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M11.279 0.152C10.909 -4.47035e-08 10.439 0 9.50001 0C8.56101 0 8.09201 -4.47035e-08 7.72101 0.152C7.4769 0.251745 7.25492 0.398782 7.06786 0.584647C6.88079 0.770512 6.73233 0.991536 6.63101 1.235C6.53701 1.458 6.50101 1.719 6.48601 2.098C6.47887 2.3725 6.40208 2.64068 6.26284 2.87736C6.1236 3.11403 5.92648 3.31142 5.69001 3.451C5.44875 3.5851 5.17755 3.65615 4.90154 3.65754C4.62552 3.65894 4.35361 3.59065 4.11101 3.459C3.77301 3.281 3.52801 3.183 3.28601 3.151C2.75659 3.08192 2.22128 3.2242 1.79601 3.547C1.47801 3.789 1.24301 4.193 0.77401 5C0.30401 5.807 0.0700103 6.21 0.0170103 6.605C-0.0529897 7.131 0.0910104 7.663 0.41701 8.084C0.56501 8.276 0.77401 8.437 1.09701 8.639C1.57401 8.936 1.88001 9.442 1.88001 10C1.88001 10.558 1.57401 11.064 1.09801 11.36C0.77401 11.563 0.56501 11.724 0.41601 11.916C0.255577 12.1242 0.13776 12.362 0.069296 12.6158C0.000832334 12.8696 -0.016935 13.1343 0.0170103 13.395C0.0700103 13.789 0.30401 14.193 0.77401 15C1.24401 15.807 1.47801 16.21 1.79601 16.453C2.22001 16.776 2.75601 16.918 3.28601 16.849C3.52801 16.817 3.77301 16.719 4.11101 16.541C4.35374 16.4092 4.62583 16.3408 4.90204 16.3422C5.17825 16.3436 5.44963 16.4147 5.69101 16.549C6.17701 16.829 6.46501 17.344 6.48601 17.902C6.50101 18.282 6.53701 18.542 6.63101 18.765C6.83501 19.255 7.22701 19.645 7.72101 19.848C8.09101 20 8.56101 20 9.50001 20C10.439 20 10.909 20 11.279 19.848C11.5231 19.7483 11.7451 19.6012 11.9322 19.4154C12.1192 19.2295 12.2677 19.0085 12.369 18.765C12.463 18.542 12.499 18.282 12.514 17.902C12.534 17.344 12.823 16.828 13.31 16.549C13.5513 16.4149 13.8225 16.3439 14.0985 16.3425C14.3745 16.3411 14.6464 16.4093 14.889 16.541C15.227 16.719 15.472 16.817 15.714 16.849C16.244 16.919 16.78 16.776 17.204 16.453C17.522 16.211 17.757 15.807 18.226 15C18.696 14.193 18.93 13.79 18.983 13.395C19.0168 13.1343 18.9989 12.8695 18.9303 12.6157C18.8616 12.3619 18.7436 12.1241 18.583 11.916C18.435 11.724 18.226 11.563 17.903 11.361C17.426 11.064 17.12 10.558 17.12 10C17.12 9.442 17.426 8.936 17.902 8.64C18.226 8.437 18.435 8.276 18.584 8.084C18.7444 7.87579 18.8623 7.63799 18.9307 7.38422C18.9992 7.13044 19.017 6.86565 18.983 6.605C18.93 6.211 18.696 5.807 18.226 5C17.756 4.193 17.522 3.79 17.204 3.547C16.7787 3.2242 16.2434 3.08192 15.714 3.151C15.472 3.183 15.227 3.281 14.889 3.459C14.6463 3.59083 14.3742 3.65922 14.098 3.65782C13.8218 3.65642 13.5504 3.58528 13.309 3.451C13.0727 3.3113 12.8758 3.11385 12.7367 2.87719C12.5977 2.64052 12.521 2.37241 12.514 2.098C12.499 1.718 12.463 1.458 12.369 1.235C12.2677 0.991536 12.1192 0.770512 11.9322 0.584647C11.7451 0.398782 11.5231 0.251745 11.279 0.152ZM9.50001 13C11.17 13 12.523 11.657 12.523 10C12.523 8.343 11.169 7 9.50001 7C7.83101 7 6.47701 8.343 6.47701 10C6.47701 11.657 7.83101 13 9.50001 13Z"
                  fill={bg}/>
        </svg>
    );
};

export default SettingsIcon;
