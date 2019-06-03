import React from 'react'
import ReactDOM from 'react-dom'
import Toptips from './toptips'

let preToptips = null;

const appToptips = (props = {}, time) => {
    // 设置一次只能出现一个toast
    if (preToptips) {
        return;
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    if (typeof props === 'string') {
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
        type: 'warn',
        callback: null
    }, props)

    const components = React.createElement(Toptips, Object.assign({}, props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            preToptips = null;

            if (props.callback instanceof Function) {
                props.callback();
            }
        }
    }));

    preToptips = components;
    ReactDOM.render(components, div)
}

export default appToptips;
