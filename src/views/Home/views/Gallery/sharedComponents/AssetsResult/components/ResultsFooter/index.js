import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Components
import { Button, Popover, Pane, Menu } from 'evergreen-ui'
import Icons from 'assets/icons'

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  onExportClick: PropTypes.func,
  onDownloadCSVClick: PropTypes.func,
  isDownloading: PropTypes.bool,
  canDownloadCampaignResultCsv: PropTypes.bool.isRequired,
  showExportButton: PropTypes.bool.isRequired,
}

function ResultsFooter(props) {
  const { onExportClick, onDownloadCSVClick, isDownloading, canDownloadCampaignResultCsv, showExportButton } = props
  const style = getStyle(props)
  const [isDownloadPopupOpened, setIsDownloadPopupOpened] = useState(false)

  return (
    <div css={style.resultsFooter()}>
      <div css={style.buttonWrapper()}>
        {showExportButton && (
          <Button css={style.button()} type='button' onClick={onExportClick}>
            DMP Export
          </Button>
        )}
        {canDownloadCampaignResultCsv && (
          <Popover
            minWidth={115}
            isShown={isDownloadPopupOpened}
            statelessProps={{ style: { borderRadius: '4px', border: 'solid 1px #979797' } }}
            onOpen={() => setIsDownloadPopupOpened(true)}
            onClose={() => setIsDownloadPopupOpened(false)}
            content={
              <Menu>
                <Menu.Item
                  css={style.itemText()}
                  onSelect={() => {
                    onDownloadCSVClick()
                    setIsDownloadPopupOpened(false)
                  }}
                >
                  <Icons.DownloadCSV css={style.itemIcon()} />
                  CSV
                </Menu.Item>
              </Menu>
            }
          >
            <Pane>
              <Button
                onClick={() => setIsDownloadPopupOpened(!isDownloadPopupOpened)}
                type='button'
                css={style.button()}
                marginRight={16}
                iconAfter={isDownloadPopupOpened ? 'caret-up' : 'caret-down'}
                appearance='primary'
                isLoading={isDownloading}
              >
                Result
              </Button>
            </Pane>
          </Popover>
        )}
      </div>
    </div>
  )
}

ResultsFooter.propTypes = propTypes

export default ResultsFooter
