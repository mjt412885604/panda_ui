import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './toast'

let preToast = null;

const appToast = (props = {}, time) => {
    // 设置一次只能出现一个toast
    if (preToast) {
        return;
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    if (typeof props == 'string' || typeof props == 'number') {
        props = {
            message: props
        }
    }

    if (time && !props.time) {
        props['time'] = time
    }

    props = Object.assign({}, {
        time: 2000,
        message: '',
        type: null,
        callback: null
    }, props)

    const components = React.createElement(Toast, Object.assign({}, props, {
        willUnmount: () => {
            appToast.hide(props.callback)
        }
    }));

    preToast = components;
    ReactDOM.render(components, div)

    appToast.hide = (callback) => {
        if (!preToast) return;
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        preToast = null;

        if (typeof callback == 'function') callback()
    }

    return appToast;
}

appToast.success = function (options = {}, time) {
    if (typeof options == 'string' || typeof options == 'number') {
        options = {
            message: options
        }
    }
    options = Object.assign({}, {
        message: '提交成功',
        type: 'success-no-circle'
    }, options)
    return appToast(options, time)
}

export default appToast;