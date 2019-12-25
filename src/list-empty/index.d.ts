import * as React from 'react'

export interface ListEmptyProps {
    className?: string;
    empty?: boolean;
    show?: boolean;
    text?: string;
    src?: string;
    emptyContent?: JSX.Element;
    children: any;
}

declare class ListEmpty extends React.Component<ListEmptyProps> {
    render(): JSX.Element;
}

export default ListEmpty;