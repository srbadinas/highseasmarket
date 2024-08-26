'use client'

import { Dispatch, Fragment, ReactNode, SetStateAction, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from './Button'

interface ModalProps {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    title: string,
    content: ReactNode | string,
}

const Modal = ({ show = false, setShow, title, content }: ModalProps) => {
    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" initialFocus={cancelButtonRef} onClose={setShow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-8 text-center sm:items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:w-4/5 md:w-3/5 lg:w-2/4">
                                <div className="w-full flex">
                                    <div className="w-[50%] bg-sidebar text-white rounded-br-full px-6 py-2 font-bold">{title}</div>
                                    <div className="w-[50%] text-end px-4 py-2"><Button type="button" className="!bg-transparent !border-0 !text-gray-400 !p-0 hover:!brightness-75" onClick={() => setShow(prev => !prev)}><i className="fas fa-times"></i></Button></div>
                                </div>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    {content}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal