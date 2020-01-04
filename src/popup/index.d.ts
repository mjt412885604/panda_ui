import * as React from 'react'

export interface PopupButtons {
    label: string;
    type?: 'default';
    onClick: (node: HTMLElement) => void;
    [index: string]: any;
}

export interface PopupProps {
    className?: string;
    title?: string;
    subTitle?: string;
    show: boolean;
    scroll?: boolean;
    buttons: PopupButtons[];
    onCancel: () => any;
}

declare class Popup extends React.Component<PopupProps> {
    render(): JSX.Element;
}

export default Popup;