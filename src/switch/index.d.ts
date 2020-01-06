import React from 'react'

export interface SwitchProps {
    checked?: boolean;
    loading?: boolean;
    disabled?: boolean;
    size?: number;
    className?: string;
    activeColor?: string;
    inActiveColor?: string;
    onChange?: () => void;
}

declare const Switch: React.FC<SwitchProps>;

export default Switch;