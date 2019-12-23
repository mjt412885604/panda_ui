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
    onClick: (node: HTMLSpanElement) => void;
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

declare class Dialog extends React.Component<DialogProps> {
    scrollTop: any;
    componentWillReceiveProps(nextProps: DialogProps): void;
    componentWillUnmount(): void;
    destoryDialog: () => void;
    preventDefault: (node: HTMLElement) => void;
    contentTouchMove: (node: HTMLDivElement) => void;
    renderButtons: () => JSX.Element;
    render(): JSX.Element;
}

export interface DownLoadProps {
    className?: string;
    action?: string;
    text?: string;
    logo?: string;
    url?: string;
}

declare class DownLoad extends React.Component<DownLoadProps> {
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

export interface CityPickerProps {
    data: any[];
    dataMap?: {
        id?: string;
        items?: string;
    };
    selected: any[];
    show: boolean;
    lang?: {
        leftBtn?: string;
        rightBtn?: string;
    };
    onChange: (select: any) => void;
    onCancel?: () => void;
}

export interface CityPickerState {
    groups: any[];
    selected: any;
    picker_show: boolean;
    text: string;
}

declare class CityPicker extends React.Component<CityPickerProps, CityPickerState> {
    parseData(data: any, subKey: any, selected: any[], group: any[], newselected: any[]): void;
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
    active?: boolea;
    avatar?: boolea;
    loading: boolea;
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