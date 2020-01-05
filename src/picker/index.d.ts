import * as React from 'react'

interface PickerDataItems {
    label: string;
    value?: string | number;
    disabled?: boolean;
}

type PickerDataItem = PickerDataItems[] | PickerDataItems

export interface PickerProps {
    className?: string;
    value?: Array<number | string>;
    data: PickerDataItem[],
    confirmText?: string;
    title?: string;
    subTitle?: string;
    onChange?: (data: number[]) => void;
    onGroupChange?: (...reset: any[]) => void;
    onCancel?: () => void;
}

declare class Picker extends React.Component<PickerProps, any>{
    render(): JSX.Element;
}

export default Picker;