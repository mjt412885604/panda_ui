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

export default ActionSheet;