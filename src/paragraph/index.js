import React from 'react'
import PropTypes from 'prop-types'

class Paragraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.children || '',
            isExpand: false,
            finished: false
        }
        this.content = null
        this.ellipsisContainer = null
    }

    componentDidMount() {
        this.setParagraphData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children != this.props.children) {
            this.setParagraphData(nextProps)
        }
    }

    componentWillUnmount() {
        if (this.ellipsisContainer) {
            document.body.removeChild(this.ellipsisContainer)
            this.ellipsisContainer = null
        }
    }

    pxToNumber = value => {
        if (!value) return 0;
        const match = value.match(/^\d*(\.\d*)?/);
        return match ? Number(match[0]) : 0;
    }

    measure = (
        originEle,
        rows,
        content,
        ellipsisStr = '...',
        circelNo = 0
    ) => {
        if (!this.ellipsisContainer) {
            this.ellipsisContainer = originEle.cloneNode(true)
            this.ellipsisContainer.setAttribute('aria-hidden', 'true')
            document.body.appendChild(this.ellipsisContainer)
        }

        this.ellipsisContainer.style.position = 'fixed';
        this.ellipsisContainer.style.left = '0';
        this.ellipsisContainer.style.height = 'auto';
        this.ellipsisContainer.style.minHeight = 'auto';
        this.ellipsisContainer.style.maxHeight = 'auto';
        this.ellipsisContainer.style.top = '-999999px';
        this.ellipsisContainer.style.zIndex = '-1000';
        this.ellipsisContainer.style.boxSizing = 'border-box';

        // // clean up css overflow
        this.ellipsisContainer.style.textOverflow = 'clip';
        this.ellipsisContainer.style.whiteSpace = 'normal';
        this.ellipsisContainer.style.webkitLineClamp = 'none';
        this.ellipsisContainer.style.wordBreak = 'break-word';

        this.ellipsisContainer.innerText = content + ellipsisStr

        const { lineHeight, fontSize, paddingTop, paddingBottom } = window.getComputedStyle(this.ellipsisContainer)
        const maxHeight = (this.pxToNumber(lineHeight) || this.pxToNumber(fontSize)) * rows +
            this.pxToNumber(paddingTop) +
            this.pxToNumber(paddingBottom);

        if (this.ellipsisContainer.offsetHeight <= maxHeight) {
            this.ellipsisContainer.innerHTML = ''
            return {
                finished: circelNo > 0,
                reactNode: content + (circelNo > 0 ? ellipsisStr : '')
            }
        } else if (content) {
            circelNo++
            return this.measure(
                originEle,
                rows,
                content.slice(0, content.length - 1),
                ellipsisStr,
                circelNo
            )
        }
    }

    setParagraphData = (props = this.props) => {
        const { children, rows } = props
        if (!this.state.isExpand && (/^[1-9]\d*$/).test(rows)) {
            const { finished, reactNode } = this.measure(this.content, rows, children)
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