import * as React from 'react'

export interface PickerDateProps {
    value: string;
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
    text: any[];
}

declare class PickerDate extends React.Component<PickerDateProps, PickerDateState>{
    parseData(data: any, subKey: any, selected: any[], group: any[], newselected: any[], num: number): void;
    updateDataBySelected(selected: any, idex: any): void;
    updateGroup(...rest: any[]): void;
    handleChange(selected: any): void;
    render(): JSX.Element;
}

export default PickerDate;