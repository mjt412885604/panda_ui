import * as React from 'react'

interface PickerCityData {
    label: string;
    value: string;
    children?: any[];
}

export interface PickerCityProps {
    data: PickerCityData[];
    value?: any[];
    title?: string;
    canceltext?: string;
    confirmtext?: string;
    dataMap?: {
        id?: string;
        items?: string;
    };
    onChange?: (select: PickerCityData[]) => void;
    onCancel?: () => void;
}

export interface PickerCityState {
    groups: any;
    selected: number[];
    text: any[];
}

declare class PickerCity extends React.Component<PickerCityProps, PickerCityState> {
    parseData(data: any, subKey: any, selected: any[], group: any[], newselected: any[], num:number): void;
    updateDataBySelected(selected: any, idex: any): void;
    updateGroup(...rest: any[]): void;
    handleChange(selected: any): void;
    render(): JSX.Element;
}

export default CityPicker;