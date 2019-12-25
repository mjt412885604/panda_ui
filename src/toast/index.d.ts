interface ToastOptions {
    time?: string;
    message: string;
    type?: null | string,
    callback?: () => void;
}

type ToastType = string | number | ToastOptions

interface ToastProps {
    (options: ToastType, time?: number): void;
    success(options: ToastType, time?: number): void;
}

declare const Toast: ToastProps;

export default Toast;