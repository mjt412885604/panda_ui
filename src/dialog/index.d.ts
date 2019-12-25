import * as React from 'react'

export interface DialogButtons {
    label: string;
    onClick: (node: HTMLElement) => void;
    [index: string]: any;
}

export interface DialogProps {
    show: boolean;
    title?: string;
    scrollHeight?: number;
    scroll?: boolean;
    className?: string;
    buttons: DialogButtons[];
    children: any;
}

declare const Dialog: React.FC<DialogProps>;

export default Dialog;