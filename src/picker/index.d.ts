import * as React from 'react'

export interface PickerProps {
    className?: string;
    mode: 'selector' | 'multiSelector' | 'time' | 'date';
    title?: string;
    start?: string
    end?: string;
    value?: any[] | string | number;
    disabled?: boolean;
    range?: any;
    onChange?: (...rest: any[]) => void;
}

export interface PickerState {
    pickerValue: any;
    hidden: boolean;
    fadeOut: boolean;
    height: any[];
}

declare class Picker extends React.Component<PickerProps, PickerState> {
    handlePrpos(props: PickerProps): void;
    componentWillReceiveProps(nextProps: PickerProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

export default Picker;