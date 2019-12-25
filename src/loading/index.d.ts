import * as React from 'react'

export interface LoadingProps {
    className?: string;
    message?: string;
    show: boolean;
    shadow?: boolean;
}

declare class Loading extends React.Component<LoadingProps> {
    preventDefault(node: HTMLElement): void;
    render(): JSX.Element;
}

export default Loading;