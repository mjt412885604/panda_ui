import * as React from 'react'

export interface DrawerButtons {
    label: string;
    type?: 'default';
    onClick: (node: HTMLElement) => void;
    [index: string]: any;
}

export interface DrawerProps {
    className?: string;
    title?: string;
    subTitle?: string;
    show: boolean;
    scroll?: boolean;
    buttons: DrawerButtons[];
    onCancel: () => any;
}

declare class Drawer extends React.Component<DrawerProps> {
    render(): JSX.Element;
}

export default Drawer;