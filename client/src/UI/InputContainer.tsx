import React, {FC} from 'react';
import Input from "./Input";

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
    required: boolean;
    multiple?: boolean
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
                                                      required,
                                                      multiple
                                                  }) => {
    return (
        <div className={containerClass}>
            <label htmlFor={id}>{label}</label>
            <Input
                onChangeHandler={onChangeHandler}
                value={value} type={type}
                placeHolder={placeHolder} maxLength={maxLength}
                name={name} id={id} multiple={multiple}
                required={required} minLength={minLength}/>
        </div>
    )
};

export default InputContainer;
