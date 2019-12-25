import * as React from 'react'

export interface MaskProps {
    className?: string;
    transparent?: boolean;
    onClick?: () => void;
}

declare class Mask extends React.Component<MaskProps> {
    preventDefault(node: HTMLDivElement): void;
    render(): JSX.Element;
}

export default Mask;