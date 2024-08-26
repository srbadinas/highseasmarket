import { Fragment, MouseEvent, PropsWithChildren, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

interface DropdownProps extends PropsWithChildren {
    toggleContent: string | ReactNode,
    toggleButtonDefaultStyle?: boolean,
    hasIcon: boolean,
}

export const Dropdown = ({ toggleContent = '', toggleButtonDefaultStyle = true, hasIcon = true, children }: DropdownProps) => {
    return (
        <Menu as="div" className="relative h-full inline-block text-left">
            <Menu.Button className={toggleButtonDefaultStyle ? "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 " : "h-full"}>
                {toggleContent}
                {hasIcon ? <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> : ""}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {children}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

interface DropdownItemProps {
    href?: string,
    icon: string,
    text: string,
    handleClick?: (evt: MouseEvent) => void
}

export const DropdownItem = ({ href = '#', icon = '', text = '', handleClick }: DropdownItemProps) => {
    return <Menu.Item>
        <Link href={href} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:!brightness-100" onClick={handleClick}>
            {icon && <i className={"w-[30px] text-center fas " + icon}></i>} {text}
        </Link>
    </Menu.Item>
}