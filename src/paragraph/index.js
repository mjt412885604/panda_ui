import React from 'react'
import PropTypes from 'prop-types'

let ellipsisContainer = null

const numberToPrecision = number => {
    if (!isNaN(number) && typeof number == 'number') {
        number = number < 0 ? 0 : number
        return +number.toPrecision(10)
    }
    return 0
}

const styleToString = style => {
    const styleNames = Array.prototype.slice.apply(style);
    return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}

const pxToNumber = value => {
    if (!value) return 0;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}

const measure = (
    originEle,
    rows,
    content,
    ellipsisStr = '...',
    circelNo = 0
) => {
    if (!ellipsisContainer) {
        ellipsisContainer = document.createElement('div')
        ellipsisContainer.setAttribute('aria-hidden', 'true')
        document.body.appendChild(ellipsisContainer)
    }

    const originStyle = (elm) => window.getComputedStyle(elm);
    const originCSS = styleToString(originStyle(originEle))

    ellipsisContainer.setAttribute('style', originCSS);
    ellipsisContainer.style.position = 'fixed';
    ellipsisContainer.style.left = '0';
    ellipsisContainer.style.height = 'auto';
    ellipsisContainer.style.minHeight = 'auto';
    ellipsisContainer.style.maxHeight = 'auto';
    ellipsisContainer.style.top = '-999999px';
    ellipsisContainer.style.zIndex = '-1000';

    // clean up css overflow
    ellipsisContainer.style.textOverflow = 'clip';
    ellipsisContainer.style.whiteSpace = 'normal';
    ellipsisContainer.style.webkitLineClamp = 'none';

    ellipsisContainer.innerText = content + ellipsisStr

    const { lineHeight, paddingTop, paddingBottom, height } = originStyle(ellipsisContainer)
    const maxHeight = numberToPrecision(pxToNumber(lineHeight) * rows) +
        pxToNumber(paddingTop) +
        pxToNumber(paddingBottom);

    if (numberToPrecision(pxToNumber(height)) <= maxHeight) {
        ellipsisContainer.innerHTML = ''
        return {
            finished: circelNo > 0,
            reactNode: content + (circelNo > 0 ? ellipsisStr : '')
        }
    } else if (content) {
        circelNo++
        return measure(
            originEle,
            rows,
            content.slice(0, content.length - 1),
            ellipsisStr,
            circelNo
        )
    }
}

class Paragraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.children || '',
            isExpand: false,
            finished: false
        }
        this.content = null
    }

    componentDidMount() {
        this.setParagraphData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children != this.props.children) {
            this.setParagraphData(nextProps)
        }
    }

    setParagraphData = (props = this.props) => {
        const { children, rows } = props
        if (!this.state.isExpand && (/^[1-9]\d*$/).test(rows)) {
            const { finished, reactNode } = measure(this.content, rows, children)
            this.setState({
                finished,
                text: reactNode
            })
        } else {
            this.setState({
                text: children
            })
        }
    }

    onChangeEllipsis = () => {
        this.setState(prev => ({
            isExpand: !prev.isExpand
        }), this.setParagraphData)
    }

    render() {
        const { isExpand, text, finished } = this.state
        const { expandRender, className, style } = this.props
        const handleDOM = expandRender ? React.cloneElement(expandRender(isExpand), {
            onClick: this.onChangeEllipsis
        }) : null

        return (
            <>
                <div
                    ref={elm => this.content = elm}
                    style={style}
                    className={className}
                >{text}</div>
                {
                    finished ? handleDOM : null
                }
            </>
        )
    }
}

Paragraph.propTypes = {
    rows: PropTypes.number,
    expand: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    expandRender: PropTypes.func
}

Paragraph.defaultProps = {
    rows: 3,
    expand: false
}

export default Paragraph;