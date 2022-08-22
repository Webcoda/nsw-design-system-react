import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useIdExtended from '../../hooks/useIdExtended'

/**
 * Docs gen
 * Main Nav
 *
 * @param  {array}   navItems         - Array of navigation item objects,
 *                                      format { link: '', text: '' }
 * @param  {boolean} megaMenu          - Display menu as mega menu
 * @param  {string}  className        - An additional class, optional
 */

export const MainNav = (props) => {
  const { navItems, megaMenu, className = '', ...attributeOptions } = props

  useEffect(() => {
    (async () => {
      const { Navigation } = await import('nsw-design-system/src/main')
      new Navigation().init()
    })()
  }, [])
  return (
    <nav
      id='main-nav'
      className={`nsw-main-nav ${className} ${megaMenu ? 'js-mega-menu' : ''}`}
      aria-label='Main Navigation'
      {...attributeOptions}
    >
      <div className='nsw-main-nav__header'>
        <div id='nsw-main-nav__title'>Menu</div>
        <button
          type='button'
          className='nsw-icon-button js-close-nav'
          aria-expanded='true'
        >
          <span
            className='material-icons nsw-material-icons'
            focusable='false'
            aria-hidden='true'
          >
            close
          </span>
          <span className='sr-only'>Close Menu</span>
        </button>
      </div>
      <ul className='nsw-main-nav__list'>
        {navItems.map((navItem, index) => (
          <li
            key={
              navItem.id
                ? `navItem-${navItem.id}`
                : navItem.url + navItem.text + index
            }
          >
            <a href={navItem.url}>
              <span>{navItem.text}</span>
              {navItem.subNav ? (
                <span
                  className='material-icons nsw-material-icons nsw-main-nav__link-icon'
                  focusable='false'
                  aria-hidden='true'
                >
                  keyboard_arrow_right
                </span>
              ) : (
                ''
              )}
            </a>
            {navItem.subNav ? (
              <SubNav
                subNav={navItem.subNav}
                url={navItem.url}
                text={navItem.text}
                description={navItem.description}
                id={navItem.id}
              />
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

MainNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
      description: PropTypes.string,
      subNav: PropTypes.arrayOf
    })
  ).isRequired,
  megaMenu: PropTypes.bool,
  className: PropTypes.string
}

export const SubNavHeader = ({ url, text, description, id }) => (
  <>
    <div className='nsw-main-nav__header'>
      <button
        type='button'
        className='nsw-icon-button nsw-icon-button--flex js-close-sub-nav'
        aria-controls={`sub-nav-${id}`}
        aria-expanded='true'
      >
        <span
          className='material-icons nsw-material-icons'
          focusable='false'
          aria-hidden='true'
        >
          keyboard_arrow_left
        </span>
        <span>
          Back
          <span className='sr-only'> to previous menu</span>
        </span>
      </button>
      <button
        type='button'
        className='nsw-icon-button js-close-nav'
        aria-expanded='true'
      >
        <i
          className='material-icons nsw-material-icons'
          focusable='false'
          aria-hidden='true'
        >
          close
        </i>
        <span className='sr-only'>Close Menu</span>
      </button>
    </div>
    <div className='nsw-main-nav__title'>
      <a href={url}>
        <span>{text}</span>
        <span
          className='material-icons nsw-material-icons'
          focusable='false'
          aria-hidden='true'
        >
          east
        </span>
      </a>
    </div>
    <div className='nsw-main-nav__description'>{description}</div>
  </>
)

SubNavHeader.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string
}

export const SubNav = ({ id = '', subNav, url, text, description }) => {
  const _id = id || useIdExtended()

  return (
    <div
      className='nsw-main-nav__sub-nav'
      id={`sub-nav-${_id}`}
      role='region'
      aria-label={text}
    >
      <SubNavHeader url={url} text={text} description={description} id={_id} />
      <ul className='nsw-main-nav__sub-list'>
        {subNav.map((subNavItem, index) => {
          const subNavId = _id + index
          return (
            <li key={subNavItem.url + subNavItem.text + index}>
              <a href={subNavItem.url}>
                <span>{subNavItem.text}</span>
                {subNavItem.subNav ? (
                  <span
                    className='material-icons nsw-material-icons nsw-main-nav__link-icon'
                    focusable='false'
                    aria-hidden='true'
                  >
                    keyboard_arrow_right
                  </span>
                ) : (
                  ''
                )}
              </a>

              {subNavItem.subNav ? (
                <div
                  className='nsw-main-nav__sub-nav'
                  id={`sub-nav-${subNavId}`}
                  role='region'
                  aria-label={`${text} Submenu`}
                >
                  <SubNavHeader
                    url={url}
                    text={text}
                    description={description}
                    id={subNavId}
                  />
                  <ul className='nsw-main-nav__sub-list'>
                    {subNavItem.subNav.map((subSubNavItem, index) => (
                      <li key={subSubNavItem.url + subSubNavItem.text + index}>
                        <a
                          href={subSubNavItem.url}
                          className='nsw-subnavigation__link'
                        >
                          <span>{subSubNavItem.text}</span>
                          {subSubNavItem.subNav ? (
                            <span
                              className='material-icons nsw-material-icons nsw-main-nav__link-icon'
                              focusable='false'
                              aria-hidden='true'
                            >
                              keyboard_arrow_right
                            </span>
                          ) : (
                            ''
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SubNav.propTypes = {
  subNav: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
      subNav: PropTypes.arrayOf
    })
  ).isRequired,
  url: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string
}
