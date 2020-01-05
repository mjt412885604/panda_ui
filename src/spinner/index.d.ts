import * as React from 'react'

export interface SipnnerProps {
    size?: number;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
    type?: 'circle' | 'spinner';
    vertical?: boolean;
}

declare const Spinner: React.FC<SipnnerProps>;

export default Spinner;