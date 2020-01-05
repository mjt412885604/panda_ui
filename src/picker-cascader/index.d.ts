import * as React from 'react'

interface PickerCascaderData {
    label: string;
    value?: string | number;
    disabled?: boolean;
    children?: any[];
}

type PickerCascaderValue = {
    label: string;
    [index: string]: any;
} | string;

export interface PickerCascaderProps {
    data: PickerCascaderData[];
    value?: PickerCascaderValue[];
    title?: string;
    subTitle?: string;
    confirmText?: string;
    onChange?: (select: PickerCascaderData[]) => void;
    onCancel?: () => void;
}

export interface PickerCascaderState {
    groups: any;
    selected: number | string[];
}

declare class PickerCascader extends React.Component<PickerCascaderProps, PickerCascaderState> {
    render(): JSX.Element;
}

export default PickerCascader;