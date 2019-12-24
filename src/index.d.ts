import * as React from 'react'

export interface ActionSheetProps {
    className?: string;
    title?: string;
    menus: Array<{
        label: string;
        value?: string | number;
    } | string | number>;
    cancelText?: string;
    disabled?: boolean;
    onCancel?: () => void;
    onChange?: (index: any) => void;
}

export interface ActionSheetState {
    show: boolean;
}

declare class ActionSheet extends React.Component<ActionSheetProps, ActionSheetState>{
    preventDefault(): void;
    selectMenu: (index: number) => void;
    showActionSheet: () => void;
    hideActionSheet: () => void;
    renderMenus: () => JSX.Element;
    render(): JSX.Element;
}

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

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    linear?: boolean;
    fixed?: boolean;
    height?: boolean;
    onClick?: (node: HTMLButtonElement) => void;
    children: any;
}

declare class Button extends React.Component<ButtonProps>{
    render(): JSX.Element;
}

export interface DialogButtons {
    label: string;
    onClick: (node: HTMLElement) => void;
    [index: string]: any;
}

export interface DialogProps {
    show: boolean;
    title?: string;
    scrollHeight?: number;
    scroll?: boolean;
    className?: string;
    buttons: DialogButtons[];
    children: any;
}

declare const Dialog: React.FC<DialogProps>;

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

export interface ListEmptyProps {
    className?: string;
    empty?: boolean;
    show?: boolean;
    text?: string;
    src?: string;
    emptyContent?: JSX.Element;
    children: any;
}

declare class ListEmpty extends React.Component<ListEmptyProps> {
    render(): JSX.Element;
}

export interface LoadingProps {
    className?: string;
    message?: string;
    show: boolean;
    shadow?: boolean;
}

declare class Loading extends React.Component<LoadingProps> {
    preventDefault(node: HTMLElement): void;
    render(): JSX.Element;
}

export interface MaskProps {
    className?: string;
    transparent?: boolean;
    onClick?: () => void;
}

declare class Mask extends React.Component<MaskProps> {
    preventDefault(node: HTMLDivElement): void;
    render(): JSX.Element;
}

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

interface CityPickerData {
    label: string;
    value: string;
    children?: any[];
}

export interface CityPickerProps {
    data: CityPickerData[];
    value?: any[];
    title?: string;
    cancelText?: string;
    confirmText?: string;
    dataMap?: {
        id?: string;
        items?: string;
    };
    onChange?: (select: CityPickerData[]) => void;
    onCancel?: () => void;
}

export interface CityPickerState {
    groups: any;
    selected: number[];
    text: any[];
}

declare class CityPicker extends React.Component<CityPickerProps, CityPickerState> {
    parseData(data: any, subKey: any, selected: any[], group: any[], newselected: any[], num:number): void;
    updateDataBySelected(selected: any, idex: any): void;
    updateGroup(...rest: any[]): void;
    handleChange(selected: any): void;
    render(): JSX.Element;
}

export interface ScrollProps {
    loadMore: boolean;
    loadText?: string;
    distance?: number
    data: any[];
    throttle?: number;
    onScrollToEnd: () => void;
}

declare class Scroll extends React.Component<ScrollProps> {
    isScroll: boolean;
    onscroll: () => void;
    onWindowOnScrollInit: () => void;
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

export interface SkeletonProps {
    active?: boolean;
    avatar?: boolean;
    loading: boolean;
    rows?: number;
    children?: any;
}

declare class Skeleton extends React.Component<SkeletonProps> {
    render(): JSX.Element;
}

declare const Toast: any;

export {
    ActionSheet,
    Avatar,
    Button,
    Dialog,
    Download,
    ListEmpty,
    Loading,
    Mask,
    Picker,
    CityPicker,
    Scroll,
    Skeleton,
    Toast
}