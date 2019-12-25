import * as React from 'react'

export interface SkeletonProps {
    active?: boolean;
    avatar?: boolean;
    loading: boolean;
    rows?: number;
    children?: any;
}

declare class Skeleton extends React.Component<SkeletonProps> {
    render(): JSX.Element;
}

export default Skeleton;