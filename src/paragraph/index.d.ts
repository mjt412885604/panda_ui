import * as React from 'react'

interface ParagraphProps {
    rows?: number;
    children: string;
    style?: React.CSSProperties;
    className?: string;
    expandRender?: (isExpand: boolean) => JSX.Element;
}

interface ParagraphState {
    text: string;
    isExpand: boolean;
    finished: boolean;
}

declare class Paragraph extends React.Component<ParagraphProps, ParagraphState> {
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    setParagraphData: () => void;
    onChangeEllipsis: () => void;
    render(): JSX.Element;
}

export default Paragraph;