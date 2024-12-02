import React, {FC} from 'react';

interface IFormProps {
    formContainerClass: string
    formClassname: string;
    formDisplay: string;
    onSubmitHandler: Function;
    formHeading: string;
    children: React.ReactNode;
    button: { classname: string, btnText: string }
}

const Form: FC<IFormProps> = ({
                                  formContainerClass,
                                  formHeading,
                                  formDisplay,
                                  formClassname,
                                  onSubmitHandler,
                                  children,
                                  button
                              }) => {
    return (
        <div
            className={formContainerClass}
            style={{display: formDisplay}}>
            <h1>{formHeading}</h1>
            <form onSubmit={e => onSubmitHandler(e)} className={formClassname}>
                {children}
                <button className={button.classname} type="submit">{button.btnText}</button>
            </form>
        </div>
    );
};

export default Form;
