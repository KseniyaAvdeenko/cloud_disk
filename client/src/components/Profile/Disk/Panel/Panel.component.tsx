import React, {FC} from 'react';
import styles from "./Panel.module.sass";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {changeFileView, changeSorting} from "../../../../store/actions/fileAction";
import {Sort} from "../../../../interface/IIntialStates";
import Input from "../../../../UI/Input";
import BackIcon from "../../../../UI/Icons/BackIcon";
import DirectoryIcon from "../../../../UI/Icons/DirectoryIcon";
import FileIcon from "../../../../UI/Icons/FileIcon";
import RowIcon from "../../../../UI/Icons/RowIcon";
import IconsIcon from "../../../../UI/Icons/IconsIcon";
import SortIcon from "../../../../UI/Icons/SortIcon";

interface INavPanelProps {
    backBtn: boolean;
    search: string;
    backClickHolder: Function;
    setIsNewDirPopup: Function;
    setIsNewFilePopup: Function;
    searchHandler: Function;
}

const Panel: FC<INavPanelProps> = ({
                                       searchHandler,
                                       search,
                                       setIsNewFilePopup,
                                       setIsNewDirPopup,
                                       backBtn,
                                       backClickHolder
                                   }) => {
    const {sort} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch()
    const sortingOptions: Sort[] = ['name', "type", "date"]

    return (
        <div className={styles.panel}>
            <div className={styles.panel__items}>
                <button style={{visibility: backBtn ? 'visible' : 'hidden'}}
                        onClick={() => backClickHolder()}
                        className={styles.panel__button}>
                    <BackIcon bg={'#cee8ff'}/>
                </button>
                <div className={styles.buttons}>
                    <button
                        onClick={() => setIsNewDirPopup(true)}
                        className={styles.buttons__button}>
                        <p>+</p> <DirectoryIcon size={'small'} bg={'#ffffff'}/>
                    </button>
                    <button
                        onClick={() => setIsNewFilePopup(true)}
                        className={styles.buttons__button}>
                        <p>+</p> <FileIcon bg={'#ffffff'} size={'small'}/>
                    </button>
                </div>
            </div>


            <div className={styles.panel__items}>
                <div className={styles.panel__searching}>
                    <Input type={'search'}
                           value={search}
                           name={'search'}
                           id={'search'}
                           required={false}
                           placeHolder={'Search'}
                           onChangeHandler={searchHandler}/>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.buttons} style={{marginRight: '1.5rem'}}>
                        <div onClick={() => dispatch(changeFileView('list'))}>
                            <RowIcon bg={"#ffffff"}/>
                        </div>
                        <div onClick={() => dispatch(changeFileView('plate'))}>
                            <IconsIcon bg={"#ffffff"}/>
                        </div>
                    </div>

                    <label htmlFor={'sort'}>
                        <SortIcon bg={'#ffffff'}/>
                        <select id={'sorting'} value={sort} onChange={e => dispatch(changeSorting(e.target.value))}
                                name="sort">
                            {sortingOptions.map(option => (<option key={option} value={option}>By {option}</option>))}
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Panel;
