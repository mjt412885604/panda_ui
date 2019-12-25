import * as React from 'react'

export interface DownloadProps {
    className?: string;
    action?: string;
    text?: string;
    logo?: string;
    url?: string;
}

declare class Download extends React.Component<DownloadProps> {
    render(): JSX.Element;
}

export default Download;