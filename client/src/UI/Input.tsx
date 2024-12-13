import React, {FC} from 'react';

interface IInputProps {
    onChangeHandler: Function;
    value: string;
    type: string;
    placeHolder?: string;
    name: string;
    id: string;
    minLength?: number
    maxLength?: number
    required: boolean;
    multiple?: boolean;
    accept?: string
}

const Input: FC<IInputProps> = ({
                                    onChangeHandler,
                                    placeHolder,
                                    type,
                                    value,
                                    multiple,
                                    maxLength,
                                    minLength,
                                    id,
                                    name,
                                    required,
                                    accept
                                }) => {
    return type === 'file' ? (
        <input
            type={type}
            name={name}
            id={id}
            required={required}
            onChange={e => onChangeHandler(e)}
            accept={accept}
            multiple={multiple}
        />
    ) : (
        <input
            type={type}
            value={value}
            placeholder={placeHolder}
            name={name}
            id={id}
            required={required}
            onChange={e => onChangeHandler(e)}
            minLength={minLength}
            maxLength={maxLength}
        />)
};

export default Input;
