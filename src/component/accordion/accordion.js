import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'nsw-design-system/src/global/scripts/helpers/utilities';

export class Accordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    const {header, body, closed, className = '', ...attributeOptions} = props
    this.uID = uniqueId('accordion');
    this.className = className;
    this.attributeOptions = attributeOptions;
    this.header = header;
    this.body = body;
  }

  render() {
    return (
      <div>
        <h2 className='nsw-accordion__title'>
          <button
            type='button'
            aria-expanded={ this.state.isOpen }
            aria-controls={ this.uID }
            className={`nsw-accordion__button ${this.state.isOpen ? 'is-open' : ''}`}
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            {this.header}
            <i
              className='material-icons nsw-material-icons nsw-accordion__icon'
              focusable='false'
              aria-hidden='true'
            >
              keyboard_arrow_right
            </i>
          </button>
        </h2>
        <div className="nsw-accordion__content"
             id={ this.uID }
             hidden={ this.state.isOpen ? '' : 'hidden' }>
          <div className="nsw-wysiwyg-content">
            {this.body}
          </div>
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Accordion.defaultProps = {
  className: null,
};

export const AccordionGroup = ({className, children, ...attributeOptions}) => (
  <div className={`nsw-accordion is-ready ${className ? className : ''}`} {...attributeOptions}>
    {children}
  </div>
);

AccordionGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
