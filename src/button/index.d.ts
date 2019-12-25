import * as React from 'react'

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    linear?: boolean;
    fixed?: boolean;
    height?: boolean;
    onClick?: (node: HTMLButtonElement) => void;
    children: any;
}

declare class Button extends React.Component<ButtonProps>{
    render(): JSX.Element;
}

export default Button;