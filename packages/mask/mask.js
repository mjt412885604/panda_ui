import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';

/**
 * screen mask, use in `Dialog`, `ActionSheet`, `Popup`.
 *
 */

class Mask extends React.Component {
    static propTypes = {
        /**
         * Whather mask should be transparent (no color)
         *
         */
        transparent: PropTypes.bool
    };

    static defaultProps = {
        transparent: false
    };

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { transparent, className, ...others } = this.props;
        const clz = classNames({
            'weui-mask': !transparent,
            'weui-mask_transparent': transparent
        }, className);

        return (
            <div ref={this.preventDefault} className={clz} {...others}></div>
        );
    }
}

export default Mask;
