import * as React from 'react'

export interface PickerDateProps {
    value?: string;
    confirmText?: string;
    title?: string;
    subTitle?: string;
    start?: string;
    end?: string;
    onChange?: (data: any[]) => void;
    onCancel?: () => void;
}

export interface PickerDateState {
    groups: any;
    selected: number[];
}

declare class PickerDate extends React.Component<PickerDateProps, PickerDateState>{
    render(): JSX.Element;
}

export default PickerDate;