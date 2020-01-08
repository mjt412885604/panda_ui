import React from 'react'

export interface PullRefreshProps {
    className?: string;
    pullingText?: string;
    loosingText?: string;
    loadingText?: string;
    headHeight?: number;
    disabled?: boolean;
    loading?: boolean;
    style?: React.CSSProperties;
    onRefresh?: (onClose: any) => void;
}

declare class PullRefresh extends React.Component<PullRefreshProps> {
    render(): JSX.Element;
}

export default PullRefresh;