import React, {FC} from 'react';

interface IInputContainerProps {
    containerClass: string;
    label: string;
    onChangeHandler: Function;
    value: string;
    type: string;
    placeHolder: string;
    name: string;
    id: string;
    minLength?: number
    maxLength?: number
    required: boolean
}

const InputContainer: FC<IInputContainerProps> = ({
                                                      minLength,
                                                      maxLength,
                                                      containerClass,
                                                      id,
                                                      name,
                                                      value,
                                                      label,
                                                      onChangeHandler,
                                                      placeHolder,
                                                      type,
                                                      required
                                                  }) => {
    return (
        <div className={containerClass}>
            <label htmlFor={id}>{label}</label>
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
            />
        </div>
    );
};

export default InputContainer;
