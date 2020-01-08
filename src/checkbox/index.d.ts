import React from 'react'

export interface CheckBoxProps {
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    type?: 'round' | 'square';
    style?: React.CSSProperties;
    onChange?: () => void;
}

declare const CheckBox: React.FC<CheckBoxProps>;

export default CheckBox;