import * as React from 'react'

interface PickerDataItems {
    label: string;
    value?: string | number;
}
interface PickerData {
    items: PickerDataItems[]
}

export interface PickerProps {
    value?: any[];
    data: PickerData[],
    confirmText?: string;
    title?: string;
    onChange?: (data: number[]) => void;
    onCancel?: () => void;
}

declare class Picker extends React.Component<PickerProps, any>{
    render(): JSX.Element;
}

export default Picker;