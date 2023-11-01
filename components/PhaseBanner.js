import propTypes from 'prop-types'
import Button from '../components/Button'
import React from 'react'

import Markdown from 'markdown-to-jsx'

/**
 * Displays the PhaseBanner on the page
 */

export default function PhaseBanner(props) {
  return (
    <div className="bg-brighter-blue-medium">
      <div className="sch-container py-4 " data-cy="topBanner">
        <div className="pb-4 md:pb-0" role="alert">
          <p className="pb-2 md:pb-7 text-xl" data-cy="learnMoreAbtBeta">
            <span className="font-bold">{props.bannerBoldText || ''} </span>
            {props.bannerText}
          </p>
          <div className="md:flex sm:flex-row md:justify-between">
            <details
              key={props.id}
              id={props.id}
              className="mb-5px text-gray-darker text-20px font-body  "
              data-testid="learn-more"
            >
              <summary
                key={`summary-${props.id}`}
                className=" text-deep-blue-60d hover:text-blue-hover hover:underline px-0.5 py-5px cursor-pointer select-none outline-none"
              >
                {props.bannerSummaryTitle}
              </summary>
              <div
                data-gc-analytics-customclick={`ESDC-EDSC:${props.refPageAA}:${props.id}`}
              >
                <Markdown
                  options={{
                    overrides: {
                      p: {
                        props: {
                          className: 'px-2 mb-1',
                        },
                      },
                      ul: {
                        props: {
                          className:
                            'text-lg md:text-20px list-disc sm:px-2 mx-8 mb-3',
                        },
                      },
                    },
                  }}
                >
                  {props.bannerSummaryContent}
                </Markdown>
              </div>
            </details>
            <Button
              id="bannerButton"
              style="primary"
              text={props.bannerButtonText}
              className="whitespace-nowrap max-h-11 my-auto w-full justify-center px-auto xs:w-auto mt-4 sm:mt-0 "
              onClick={(e) => {
                e.preventDefault()
                props.openModal(props.bannerButtonLink, 'betaBannerModal')
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

PhaseBanner.propTypes = {
  /**
   * Phasebanner text Bold
   */
  bannerBoldText: propTypes.string,
  /**
   * Phasebanner text
   */
  bannerText: propTypes.string,
  /**
   * Phasebanner Link text
   */
  bannerSummaryTitle: propTypes.string,
  /**
   * Phasebanner Link href
   */
  bannerSummaryContent: propTypes.string,
  /**
   * Phasebanner Button Text
   */
  bannerButtonText: propTypes.string,
  /**
   * Phasebanner Button Href
   */
  bannerButtonHref: propTypes.string,
  /**
   * Boolean to determine if the button in the banner links to an external page
   */
  bannerButtonExternalLink: propTypes.bool,
  /**
   * Screen reader only external link text
   */
  bannerButtonExternalText: propTypes.string,
  /**
   * Icon Text
   */
  icon: propTypes.string,
  /**
   * Popup content
   */
  popupContent: propTypes.shape({
    popupId: propTypes.string.isRequired,
    popupTitle: propTypes.string.isRequired,
    popupDescription: propTypes.string.isRequired,
    popupPrimaryBtn: propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
    }),
    popupSecondaryBtn: propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
    }),
  }),
}
