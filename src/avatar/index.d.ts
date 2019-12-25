import * as React from 'react'

export interface AvatarProps {
    size?: number;
    icon?: string;
    style?: React.CSSProperties;
    className?: string;
    vip?: boolean;
    img?: boolean;
}

declare class Avatar extends React.Component<AvatarProps>{
    render(): JSX.Element;
}

export default Avatar;