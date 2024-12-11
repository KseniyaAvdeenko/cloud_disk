import React, {FC} from 'react';
import styles from "./Disk.module.sass";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {changeSorting} from "../../../store/actions/fileAction";
import {Sort} from "../../../interface/IIntialStates";
import Input from "../../../UI/Input";

interface INavPanelProps {
    backBtn: boolean;
    search: string;
    backClickHolder: Function;
    setIsNewDirPopup: Function;
    setIsNewFilePopup: Function;
    searchHandler: Function;
}

const NavPanel: FC<INavPanelProps> = ({searchHandler, search, setIsNewFilePopup, setIsNewDirPopup, backBtn, backClickHolder}) => {
    const {sort} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch()
    const sortingOptions: Sort[] = ['name', "type", "date"]

    return (
        <div className={styles.main__buttons}>
            <button style={{visibility: backBtn ? 'visible' : 'hidden'}}
                    onClick={() => backClickHolder()}
                    className={styles.main__buttons__button}>
                Back
            </button>
            <div className={styles.main__searching}>
                <Input type={'search'}
                       value={search}
                       name={'search'}
                       id={'search'}
                       required={false}
                       placeHolder={'Search'}
                       onChangeHandler={searchHandler}/>
            </div>
            <div className={styles.main__sorting}>
                <select value={sort} onChange={e=>dispatch(changeSorting(e.target.value))} name="sort" id="sort">
                    {sortingOptions.map(option=>(<option key={option} value={option}>By {option}</option>))}
                </select>
            </div>
            <div>
                <button
                    onClick={() => setIsNewDirPopup(true)}
                    className={styles.main__buttons__button}>
                    Create folder
                </button>
                <button
                    onClick={() => setIsNewFilePopup(true)}
                    className={styles.main__buttons__button}>
                    Upload file
                </button>
            </div>

        </div>
    );
};

export default NavPanel;
