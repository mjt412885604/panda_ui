import * as React from 'react'

export interface ScrollProps {
    loadMore: boolean;
    loadText?: string;
    distance?: number
    data: any[];
    throttle?: number;
    onScrollToEnd: () => void;
}

declare class Scroll extends React.Component<ScrollProps> {
    isScroll: boolean;
    onscroll: () => void;
    onWindowOnScrollInit: () => void;
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

export default Scroll;