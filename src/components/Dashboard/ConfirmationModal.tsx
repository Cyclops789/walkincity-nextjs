import React, { useEffect } from 'react';
import { faX, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

export interface IConfirmationModalType {
    open: boolean;
    text: string;
    type: 'delete' | 'create';
    button: {
        accept: string;
        decline: string;
    };
    onAccept(): void;
    onDecline(): void;
}

export interface IConfirmationModal {
    modal: IConfirmationModalType;
    setModalData: Dispatch<SetStateAction<IConfirmationModalType>>;
}

function ConfirmationModal({ modal, setModalData }: IConfirmationModal) {
    const clearModal = () => {
        setModalData({
            open: false,
            text: '',
            type: 'delete',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel',
            },
            onAccept: () => {},
            onDecline: () => {}
        });
    }

    useEffect(() => {
        clearModal()
    }, []);
    
    return (
        modal && (
            <div 
                style={{
                    zIndex: 100
                }}
                className={`overflow-y-auto overflow-x-hidden ${modal.open ? 'fixed' : 'hidden'} inset-0 flex justify-center items-center w-full max-h-full bg-black bg-opacity-50 shadow-lg`}
            >
                <div className={"relative p-4 w-full max-w-md max-h-full"}>
                    <div style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={"relative rounded-lg shadow"}>
                        <button onClick={() => { modal.onDecline(); clearModal() }} className={"absolute top-3 end-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"}>
                            <FontAwesomeIcon className={"w-3 h-3"} icon={faX} />
                        </button>
                        <div className={"p-4 md:p-5 text-center"}>
                            <FontAwesomeIcon className={"mx-auto mb-4 w-12 h-12 text-gray-200"} icon={faCircleInfo} />
                            <h3 className={"mb-5 text-lg font-normal text-gray-400"}>
                                {modal.text}
                            </h3>
                            <button onClick={() => modal.onAccept()} className={`text-white bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] focus:ring-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2`}>
                                {modal.button?.accept}
                            </button>
                            <button style={{ backgroundColor: 'rgb(56, 56, 56)' }} onClick={() => { modal.onDecline(); clearModal(); }} className={"focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"}>
                                {modal.button?.decline}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ConfirmationModal;