/**
 * @author Ding 20200725
 * @description 針對所有 kepler.gl 既有的 modal 的 UI 進行客製化，
 * 如果 kepler.gl 原始沒有的 modal 則走額外的路線
 *
 * 備註：針對 kepler.gl 原始沒有的 modal （可參考 kepler.js default-settings.js )，
 * 其實可以 針對 kepler.gl modal-container.js 進行擴充
 * 不過目前只有一個 modal 例外，如果採用先前的做法，雖然比較優雅，但機會成本過大，
 * 因此目前在 customModal 開條新路給 overlimit modal，
 * 如果未來修改者欲再擴充 modal，可參考 JT 的 app-reducer.js 的 show-modal 進行擴充，
 * 或是採用先前建議的 modal-container.js 擴充法，
 *
 * 補充說明： overlimit 不走 app-reducer.js 的原因為，呼叫 overlimit 的地方，為 kepler.gl 的核心，
 * 那邊邏輯皆是對 kepler.gl 本身 state 進行操作，因此 overlimit 選擇納入 kepler.gl 核心管理
 */

import React, { useState, Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Dialog } from 'evergreen-ui'
import { ModalDialogFactory, withState } from 'kepler.gl/components'
import { FormattedMessage } from 'react-intl'

import OverlimitModal from '../overlimitModal'

const StyledModal = styled(Dialog)`
  background-color: #fff;
`

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
`

const StyleTabList = styled.div`
  margin-top: 24px;
  display: flex;
`
const StyleTab = styled.div`
  //font-family: OpenSans;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  width: 150px;
  height: 40px;
  border: ${props => (props.isActive ? 'none' : 'solid 1px #979797')};
  background-color: ${props => (props.isActive ? '#000' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#d8d8d8')};
  text-align: center;
  line-height: 40px;
  user-select: none;
  cursor: pointer;
`

function CustomModal(props) {
  const { isOpen, onCancel, onConfirm, children, title, uiState } = props
  const [currentTab, setCurrent] = useState('loadRemote')
  if (!props.children) return null

  let modalProps = {}
  if (['addData', 'exportImage', 'overlimit'].includes(uiState.currentModal)) {
    modalProps = {
      width: 600,
      hasFooter: false,
      contentContainerProps: {
        overflow: 'visible',
      },
    }
  } else {
    modalProps = { width: 960, bodyStyle: { padding: '24px 96px' } }
  }

  let header
  let updatedChildren = children

  if (uiState.currentModal === 'addData') {
    header = (
      <StyledHeader>
        <FormattedMessage id={title} />
        <StyleTabList>
          <StyleTab isActive={currentTab === 'loadRemote'} onClick={() => setCurrent('loadRemote')}>
            Load Data
          </StyleTab>
          <StyleTab isActive={currentTab === 'uploadFile'} onClick={() => setCurrent('uploadFile')}>
            Upload File
          </StyleTab>
        </StyleTabList>
      </StyledHeader>
    )
  } else if (uiState.currentModal === 'overlimit') {
    header = <StyledHeader>Partial Results Loaded</StyledHeader>
    updatedChildren = <OverlimitModal />
  } else if (title) {
    header = (
      <StyledHeader>
        <FormattedMessage id={title} />
      </StyledHeader>
    )
  } else {
    header = ''
  }

  return isOpen ? (
    <StyledModal
      title={header}
      containerProps={{
        paddingY: '13px',
        paddingX: '24px',
      }}
      isShown={isOpen}
      topOffset='auto'
      onCloseComplete={onCancel}
      onConfirm={onConfirm}
      {...modalProps}
    >
      {Children.map(updatedChildren, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { onCancel, onConfirm, currentTab })
        }

        return child
      })}
    </StyledModal>
  ) : null
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
  uiState: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.string]),
}

export const CustomModalFactory = () => withState([], state => ({ ...state.keplerGl.map1 }))(CustomModal)

export function replaceModal() {
  return [ModalDialogFactory, CustomModalFactory]
}
