import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isEmpty, cloneDeep } from 'lodash'
import loadable from '@loadable/component'
import { AutoSizer, Collection } from 'react-virtualized'
import { format } from 'date-fns'

// Components
import Search from './components/Search'
import Media from './components/Media'
import Icons from 'assets/icons'
import facebookIcon from 'assets/icons/img/logo_facebook.png'
import youtubeIcon from 'assets/icons/img/logo_youtube.png'
import instagramIcon from 'assets/icons/img/logo_instagram.png'
import { Button, Dialog, Menu, Pane, Popover, Text } from 'evergreen-ui'
import Tab from 'basicComponents/Tab'
import NoAssets from './components/NoAssets'
import Spinner from 'basicComponents/Spinner'
import Navigation from './components/Navigation'
import MultipleModal from './components/MultipleModal'
import MultipleAssets from './sharedComponents/MultipleAssets'

// Lib MISC
import useGlobalState from 'globalState'
import useTab from 'basicComponents/Tab/hooks/useTab'
import useFetchOptionEffect from './sharedHooks/useFetchOptionEffect'
import { getUploadList } from '../../sharedHooks/useUploadListState'
import { useNavigation } from './hooks/useNavigation'
import { updateUploadingItem } from '../../sharedMethods/updateUploadingItem'
import { useProgramAssets, DEFAULT_PAGE_SIZE, TABS } from './hooks/useProgramAssets'
import { useCurrenList } from './hooks/useCurrentList'
import { fetchAssetsDownload } from 'api/Gallery/AssetsResults/fetchAssetsDownload'
import { exportFile, getFilename } from 'utils/download'
import { MAXIMUM_SELECTED_ASSETS } from './constants/maximumSelectedAssets'
import { getCoolDownStatus } from './sharedMethods/getCoolDownStatus'
import { getLiveStatus } from './sharedMethods/getLiveStatus'
import { ACTION_TYPES } from './constants/actionTypes'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

// Variables / Functions
const YOUTUBE_ICON_WIDTH = 20

const ITEM_WIDTH = 220 // mediaItem ??????
const ITEM_HEIGHT = 290 // mediaItem ??????
const LIST_ADDITIONAL_WIDTH = 30 // ???????????? width ?????? 30 ??? onResize ??? UX ?????????
const TOP_HEIGHT = 108
const HIDE_TOP_HEIGHT = 280
const SEARCH_TAB_HEIGHT = 231
const ACTION_FOOTER_HEIGHT = 65

const AssetsCreator = loadable(() => import('./views/AssetsCreator'))
const AssetsMultipleCreator = loadable(() => import('./views/AssetsMultipleCreator'))
const AssetsDuplicator = loadable(() => import('./views/AssetsDuplicator'))
const AssetsEditor = loadable(() => import('./views/AssetsEditor'))
const AssetsViewer = loadable(() => import('./views/AssetsViewer'))

function Gallery(props) {
  const style = getStyle(props)
  const [state, dispatch] = useGlobalState()
  const { match, history } = props
  const { params } = match
  const { assetId } = params

  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess } = userRoleInfo
  const {
    canUploadAsset,
    canDownloadMultipleAssetZip,
    canEditAsset,
    canEditLiveAsset,
    canEditLiveAssetOver24Hr,
    canMoveAsset,
    canMoveLiveAsset,
    canMoveLiveAssetOver24Hr,
  } = CMPAccess

  // TODO: ?????? Actions ???????????? Duplicate, Move, Delete
  // ?????? Actions ???????????????????????? Actions button ??????

  const showEditAction = canEditAsset || canEditLiveAsset
  const showMoveAction = canMoveAsset || canMoveLiveAsset
  const showDownloadAction = canDownloadMultipleAssetZip

  const hasActionsButton = showDownloadAction || showEditAction || showMoveAction

  const collectionRef = useRef(null)
  const listEndRef = useRef(null)

  const { setCurrentTab, currentTab, tabProps } = useTab()

  const [currentObserver, setCurrentObserver] = useState(null)
  const [isShowTop, setIsShowTop] = useState(true)
  const [isActionsPopupOpened, setIsActionsPopupOpened] = useState(false)
  const [isUploadPopupOpened, setIsUploadPopupOpened] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState([])
  const [showActionFooter, setShowActionFooter] = useState(null)
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)

  const [isMultipleModalOpen, setIsMultipleModalOpen] = useState(false)
  const [isMultipleAssetsShown, setIsMultipleAssetsShown] = useState(false)
  const [multipleModalInfo, setMultipleModalInfo] = useState({})

  const [isLazyloading, setIsLazyloading] = useState(false)

  const [currentScrollTop, setCurrentScrollTop] = useState(0)

  const isSelectedMediaEmpty = selectedMedia.length === 0
  const reachMaxSelectedAssets = selectedMedia.length === MAXIMUM_SELECTED_ASSETS

  const { navigations, updateProgramList, isProgramListLoaded } = useNavigation()

  const { filterOptions } = useFetchOptionEffect({ hasAll: true, isMixPlatform: true })
  const { filterOptions: filterOptionsWithoutAll } = useFetchOptionEffect() // ?????? multple edit ??? move ??? option ?????? all, ?????????????????? call ?????? API

  const isMultipleDownload = showActionFooter === ACTION_TYPES.DOWNLOAD
  const isMultipleEdit = showActionFooter === ACTION_TYPES.EDIT
  const isMultipleMove = showActionFooter === ACTION_TYPES.MOVE

  const {
    isAssetsLoaded,
    programAssets,
    updateProgramAssets,
    error,
    currentProgram,
    currentCampaign,
    handleLoadmore,
    onTabItemClick,
    currentAssetList,
    isFetching,
    searchForm,
    onInputChange,
    onSearchClick,
    initiateCurrentAssetList,
  } = useProgramAssets(match, history, currentObserver, setCurrentObserver, setCurrentTab, currentTab, tabProps)

  const hasAssets = !isEmpty(currentAssetList)

  useEffect(() => {
    if (!hasAssets) {
      setIsShowTop(true)
    }
  }, [hasAssets])

  // ?????? hooks ?????? Collection Node
  // ???????????????????????? Collection ??? ListEndNode??????????????? createPortal ???????????? ListEndNode ?????? Collection ???
  const { currentListNode } = useCurrenList(isAssetsLoaded, hasAssets)
  const ListEndNode = <div id='list-end' css={style.listEnd()} ref={listEndRef} />

  // ??? assets ??????????????? observer
  // isFetching ??????????????????????????? observer
  useEffect(() => {
    if (hasAssets && currentAssetList && !isFetching) {
      // ?????? currentPage ?????? callback ???????????? useState ?????? setState??????????????????????????????????????????
      // ????????? tabItemClick, search, navigation click ????????????????????? observer set null
      // ?????? currentPage ??????????????????
      let currentPage = 1

      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            currentPage = currentPage + 1

            handleLoadmore(currentPage)
          }
        })
      }

      if (currentObserver) return

      const observer = new IntersectionObserver(callback, {
        threshold: 0,
      })

      setCurrentObserver(observer)
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect()
      }
    }
  }, [currentAssetList, currentObserver, handleLoadmore, hasAssets, isFetching])

  // ??????????????????(next)?????? currentAssetList ???????????? DEFAULT_PAGE_SIZE ????????? observe
  // ?????????????????????????????? observe
  useEffect(() => {
    if (
      currentObserver &&
      listEndRef.current &&
      !isEmpty(programAssets.next) &&
      !isEmpty(currentAssetList) &&
      currentAssetList.length >= DEFAULT_PAGE_SIZE
    ) {
      currentObserver.observe(listEndRef.current)
    }

    if (currentObserver && isEmpty(programAssets.next)) {
      currentObserver.disconnect()
    }
  }, [currentAssetList, currentObserver, programAssets])

  useEffect(() => {
    const uploadList = Object.values(getUploadList())

    if (isEmpty(uploadList)) return

    const newAssetFile = uploadList.find(item => item.file && !item.assetPath)
    const newAssetFileId = newAssetFile?.id
    const newAssetPathId = programAssets?.programAssetList?.find(item => item.file === newAssetFile?.file)?.assetId

    if (!newAssetFile) return

    updateUploadingItem(newAssetFileId, dispatch, {
      assetPath: `/home/gallery/view/${newAssetPathId}/info`,
    })
  }, [dispatch, programAssets])

  useEffect(() => {
    // TODO ??? error ??? do something
  }, [error])

  // ?????? Gallery ?????? header mode ??? title
  useEffect(() => {
    dispatch({ type: 'SET_THEME', mode: 'light', title: 'gallery' })
  }, [dispatch])

  const onUploadButtonClick = () => {
    history.push('/home/gallery/createAssets')
  }

  const onMultipleUploadButtonClick = () => {
    history.push('/home/gallery/createMultipleAssets')
  }

  const onAssetModalClose = () => {
    if (isEmpty(currentProgram)) {
      history.push('/home/gallery')
    } else {
      if (currentCampaign) {
        history.push(`/home/gallery/program/${currentProgram}/${currentCampaign}`)
      } else {
        history.push(`/home/gallery/program/${currentProgram}`)
      }
    }
  }

  const cellRenderer = cell => {
    const { index, style, isScrolling } = cell

    if (!isScrolling || !isLazyloading) {
      return (
        // ??????????????? cell ??? style?????????????????? inline ??????
        <div key={index} style={{ ...style, margin: '20px 20px 4px 0px' }}>
          <Media
            index={index}
            updateProgramAssets={updateProgramAssets}
            updateProgramList={updateProgramList}
            initiateCurrentAssetList={initiateCurrentAssetList}
            media={currentAssetList[index]}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
            showActionFooter={showActionFooter}
            onDownloadAssets={onDownloadAssets}
            reachMaxSelectedAssets={reachMaxSelectedAssets}
            setIsSelectionModalOpen={setIsSelectionModalOpen}
            multipleModalInfo={multipleModalInfo}
          />
        </div>
      )
    } else {
      return (
        <div key={index} style={style}>
          <Media isEmpty media={{}} selectedMedia={selectedMedia} />
        </div>
      )
    }
  }

  const cellSizeAndPositionGetter = (cell, width) => {
    const { index } = cell

    // react-virtualized ?????? Collection ??? position ????????????
    // ????????????????????? position ?????? flex-wrap ?????????????????? resize ????????????????????? width ???????????? position
    const WIDTH = width > ITEM_WIDTH ? width + LIST_ADDITIONAL_WIDTH : ITEM_WIDTH

    const itemSizeForRow = Math.floor(WIDTH / ITEM_WIDTH)

    const rowNumber = Math.floor(index / itemSizeForRow)

    const newData = currentAssetList.map(item => {
      return { ...item, width: ITEM_WIDTH, height: ITEM_HEIGHT, x: ITEM_WIDTH * (index % itemSizeForRow), y: ITEM_HEIGHT * rowNumber }
    })

    const datum = newData[index]

    return {
      height: datum.height,
      width: datum.width,
      x: datum.x,
      y: datum.y,
    }
  }

  const onResize = () => {
    if (!isEmpty(collectionRef.current)) {
      // Collection ????????? position ?????? item ???????????????????????????????????????
      // ????????? resize ?????????????????? position
      collectionRef.current.recomputeCellSizesAndPositions()
    }
  }

  const onScroll = scrollProps => {
    // react-virtualized ???????????? WindowScroller ?????????????????????????????? WindowScroller ???????????????????????? Collection
    // ???????????????????????????????????? HIDE_TOP_HEIGHT ????????? search ??? tab ?????????
    const { scrollTop } = scrollProps

    const scrollOffeset = currentScrollTop - scrollTop

    if (Math.abs(scrollOffeset) > 1200) {
      setIsLazyloading(true)

      setTimeout(() => {
        setIsLazyloading(false)
      }, 1300)
    }

    setCurrentScrollTop(scrollTop)

    if (scrollTop > HIDE_TOP_HEIGHT) {
      setIsShowTop(false)
    } else {
      setIsShowTop(true)
    }
  }

  const onDownloadAssets = async singleAssetId => {
    if (isDownloading) return

    setIsDownloading(true)
    let assetIds
    // ?????? download ?????? asset??????????????? asset id
    if (singleAssetId) {
      assetIds = singleAssetId
    }
    // ?????????????????? selectedMedia ?????????????????? asset id
    // ???????????????????????? [1,2,3] --> "1,2,3"
    else {
      assetIds = selectedMedia.map(item => item.assetId).toString()
    }

    try {
      const response = await fetchAssetsDownload({ assetIds, sheetFileType: 'xlsx', timezone: format(new Date(), 'xxx') })
      const { request, headers } = response
      exportFile({ blob: request.response, fileName: getFilename(headers['content-disposition']) })
    } catch (error) {
      console.error(error)
    }
    setIsDownloading(false)
    setSelectedMedia([])
    setShowActionFooter(false)
  }

  const handleSelectAll = () => {
    if (isMultipleDownload) {
      const allAssetItems = cloneDeep(currentAssetList).splice(0, MAXIMUM_SELECTED_ASSETS)

      setSelectedMedia(allAssetItems)
    } else if (isMultipleEdit) {
      const allAssetItems = cloneDeep(currentAssetList)
        .filter(item => {
          const { program, campaignName, startDate, endDate, createdTimestamp } = item
          const isWithin24Hours = getCoolDownStatus(createdTimestamp)
          const isLive = getLiveStatus(startDate, endDate)

          const canEdit = (isLive && canEditLiveAsset && (isWithin24Hours || canEditLiveAssetOver24Hr)) || (!isLive && canEditAsset)

          return canEdit && program === multipleModalInfo.assetProgram && campaignName === multipleModalInfo.campaignName
        })
        .splice(0, MAXIMUM_SELECTED_ASSETS)

      setSelectedMedia(allAssetItems)
    } else if (isMultipleMove) {
      const allAssetItems = cloneDeep(currentAssetList)
        .filter(item => {
          const { startDate, endDate, createdTimestamp } = item
          const isWithin24Hours = getCoolDownStatus(createdTimestamp)
          const isLive = getLiveStatus(startDate, endDate)

          const canMove = (isLive && canMoveLiveAsset && (isWithin24Hours || canMoveLiveAssetOver24Hr)) || (!isLive && canMoveAsset)

          return canMove
        })
        .splice(0, MAXIMUM_SELECTED_ASSETS)

      setSelectedMedia(allAssetItems)
    }
  }

  const handleUnselectAll = () => {
    setSelectedMedia([])
  }

  return (
    <>
      <Dialog
        isShown={isSelectionModalOpen}
        onCloseComplete={() => setIsSelectionModalOpen(false)}
        title='Exceed asset selection limit'
        hasCancel={false}
        hasClose={false}
        shouldCloseOnOverlayClick={false}
        confirmLabel='Got it'
      >
        Assets are limited to maximum of {MAXIMUM_SELECTED_ASSETS} assets per selection
      </Dialog>
      <div css={style.galleryWrapper()}>
        <Navigation navigations={navigations} {...props} />
        <div css={style.gallery()}>
          <div css={style.inputButtonWrapper(isShowTop)}>
            <Search searchForm={searchForm} filterOptions={filterOptions} onSearchClick={onSearchClick} onInputChange={onInputChange} />
            <div css={style.buttonWrapper()}>
              {hasActionsButton && (
                <Popover
                  minWidth={92.5}
                  isShown={isActionsPopupOpened}
                  statelessProps={{ style: { borderRadius: '4px', border: 'solid 1px #979797', minHeight: 'inherit' } }}
                  onOpen={() => setIsActionsPopupOpened(true)}
                  onClose={() => setIsActionsPopupOpened(false)}
                  content={({ close }) => (
                    <Menu>
                      <>
                        {showEditAction && (
                          <Menu.Item
                            css={style.itemText()}
                            onSelect={() => {
                              setIsMultipleModalOpen(true)
                            }}
                          >
                            <div css={style.itemIconWrapper()}>
                              <Icons.Edit css={style.itemIcon()} />
                              Edit
                            </div>
                          </Menu.Item>
                        )}
                        {showMoveAction && (
                          <Menu.Item
                            css={style.itemText()}
                            onSelect={() => {
                              close()
                              setShowActionFooter(ACTION_TYPES.MOVE)
                            }}
                          >
                            <div css={style.itemIconWrapper()}>
                              <Icons.Move css={style.itemIcon()} />
                              Move
                            </div>
                          </Menu.Item>
                        )}
                        {showDownloadAction && (
                          <Menu.Item
                            css={style.itemText()}
                            onSelect={() => {
                              close()
                              setShowActionFooter(ACTION_TYPES.DOWNLOAD)
                            }}
                          >
                            <div css={style.itemIconWrapper()}>
                              <Icons.Download css={style.itemIcon()} />
                              Download
                            </div>
                          </Menu.Item>
                        )}
                      </>
                    </Menu>
                  )}
                >
                  <Pane>
                    <Button
                      type='button'
                      width={121}
                      css={style.actionButton()}
                      iconAfter={isActionsPopupOpened ? 'caret-up' : 'caret-down'}
                      appearance='primary'
                    >
                      Actions
                    </Button>
                  </Pane>
                </Popover>
              )}
              {canUploadAsset && (
                <Popover
                  minWidth={92.5}
                  isShown={isUploadPopupOpened}
                  statelessProps={{
                    style: { borderRadius: '4px', border: 'solid 1px #979797', width: '126px', marginLeft: '8px', minHeight: 'inherit' },
                  }}
                  onOpen={() => setIsUploadPopupOpened(true)}
                  onClose={() => setIsUploadPopupOpened(false)}
                  content={({ close }) => (
                    <Menu css={style.uploadMenu()}>
                      <Menu.Item
                        css={style.itemText()}
                        onSelect={() => {
                          close()
                          onUploadButtonClick()
                        }}
                      >
                        <div css={style.itemIconWrapper()}>
                          <Icons.Single css={style.itemIcon()} />
                          Single
                        </div>
                      </Menu.Item>
                      <Menu.Item
                        css={style.itemText()}
                        onSelect={() => {
                          close()
                          onMultipleUploadButtonClick()
                        }}
                      >
                        <div css={style.itemIconWrapper()}>
                          <Icons.Multiple css={style.itemIcon()} />
                          Multiple
                        </div>
                      </Menu.Item>
                    </Menu>
                  )}
                >
                  <Pane>
                    <Button css={style.uploadButton()} iconBefore='upload'>
                      Upload Asset
                    </Button>
                  </Pane>
                </Popover>
              )}
            </div>
          </div>
          <Tab {...tabProps} css={style.tabs()}>
            <Tab.TabList
              css={style.tabsList(isShowTop)}
              itemCss={({ isActive }) => style.tabsListItem(isActive)}
              onTabItemClickProps={onTabItemClick}
            >
              <Tab.TabList.Item name={TABS.ALL} />
              <Tab.TabList.Item name={TABS.FACEBOOK} icon={<img src={facebookIcon} css={style.tabsItemIcon()} />} />
              <Tab.TabList.Item name={TABS.DIGITAL_DISPLAY} icon={<Icons.DigitalDisplay css={style.tabsItemIcon()} />} />
              <Tab.TabList.Item name={TABS.YOUTUBE} icon={<img src={youtubeIcon} css={style.tabsItemIcon(YOUTUBE_ICON_WIDTH)} />} />
              <Tab.TabList.Item name={TABS.INSTAGRAM} icon={<img src={instagramIcon} css={style.tabsItemIcon()} />} />
              <Tab.TabList.Item name={TABS.MOBILE} icon={<Icons.Mobile css={style.tabsItemIcon()} />} />
            </Tab.TabList>
            <Tab.TabPanelList css={style.tabsPanelList()} itemCss={({ isActive }) => style.tabsPanelItem(isActive)}>
              {isProgramListLoaded && isAssetsLoaded && (
                <>
                  <Tab.TabPanelList.Item name={TABS.ALL}>
                    <div css={style.mediaWrapper()}>
                      {hasAssets && (
                        <>
                          <AutoSizer disableHeight onResize={onResize}>
                            {({ width }) => {
                              // ?????? showActionFooter ??? true ?????? height ?????? ACTION_FOOTER_HEIGHT
                              const paddingBottom = showActionFooter ? ACTION_FOOTER_HEIGHT : 0

                              return (
                                <Collection
                                  id='assets-list'
                                  css={style.collection()}
                                  ref={collectionRef}
                                  cellCount={currentAssetList.length}
                                  cellRenderer={cellRenderer}
                                  cellSizeAndPositionGetter={cell => cellSizeAndPositionGetter(cell, width)}
                                  horizontalOverscanSize={10}
                                  verticalOverscanSize={960}
                                  width={width + LIST_ADDITIONAL_WIDTH}
                                  height={
                                    isShowTop
                                      ? window.innerHeight - SEARCH_TAB_HEIGHT - paddingBottom
                                      : window.innerHeight - TOP_HEIGHT - paddingBottom
                                  }
                                  onScroll={onScroll}
                                />
                              )
                            }}
                          </AutoSizer>
                          {/* ???????????????????????? Collection ??? ListEndNode??????????????? createPortal ???????????? ListEndNode ?????? Collection ??? */}
                          {currentListNode && ReactDOM.createPortal(ListEndNode, currentListNode)}
                        </>
                      )}
                      {!hasAssets && <NoAssets />}
                      <div id='list-end' ref={listEndRef} />
                    </div>
                  </Tab.TabPanelList.Item>
                  {(isFetching || isLazyloading) && <Spinner />}
                </>
              )}
            </Tab.TabPanelList>
          </Tab>
        </div>
        <Switch>
          {canUploadAsset && (
            <Route exact sensitive path='/home/gallery/createAssets'>
              {props => (
                <AssetsCreator
                  updateProgramAssets={updateProgramAssets}
                  updateProgramList={updateProgramList}
                  initiateCurrentAssetList={initiateCurrentAssetList}
                  overPageProps={{
                    onCloseComplete: onAssetModalClose,
                    isShown: props.match !== null,
                  }}
                  {...props}
                />
              )}
            </Route>
          )}
          {canUploadAsset && (
            <Route exact sensitive path='/home/gallery/createMultipleAssets'>
              {props => (
                <AssetsMultipleCreator
                  updateProgramAssets={updateProgramAssets}
                  updateProgramList={updateProgramList}
                  initiateCurrentAssetList={initiateCurrentAssetList}
                  onAssetModalClose={onAssetModalClose}
                  overPageProps={{
                    onCloseComplete: onAssetModalClose,
                    isShown: props.match !== null,
                    style: { width: '950px', height: '90%', maxHeight: 'initial', margin: 'auto' },
                    hasHeader: false,
                    confirmLabel: 'Next',
                    childrenWrapperCss: { height: '100%', padding: '24px 35px' },
                    isMultipleUpload: true,
                    shouldCloseOnEscapePress: false,
                  }}
                  // setIsMultipleAssetsShown={setIsMultipleAssetsShown}
                  {...props}
                />
              )}
            </Route>
          )}
          <Route exact sensitive path='/home/gallery/view/:assetId/:assetFormType'>
            {props => (
              <AssetsViewer
                overPageProps={{
                  onCloseComplete: onAssetModalClose,
                  hasCancel: false,
                  confirmLabel: 'Edit',
                  isShown: props.match !== null,
                  onConfirm: () => history.push(`/home/gallery/edit/${assetId}/info`),
                  hasFooter: false,
                }}
                assetViewType='view'
                {...props}
              />
            )}
          </Route>
          <Route exact sensitive path='/home/gallery/edit/:assetId/:assetFormType'>
            {props => (
              <AssetsEditor
                updateProgramAssets={updateProgramAssets}
                updateProgramList={updateProgramList}
                initiateCurrentAssetList={initiateCurrentAssetList}
                overPageProps={{
                  onCloseComplete: onAssetModalClose,
                  confirmLabel: 'Save',
                  isShown: props.match !== null,
                }}
                assetViewType='edit'
                {...props}
              />
            )}
          </Route>
          <Route exact sensitive path='/home/gallery/duplicate/:assetId/:assetFormType'>
            {props => (
              <AssetsDuplicator
                updateProgramAssets={updateProgramAssets}
                updateProgramList={updateProgramList}
                initiateCurrentAssetList={initiateCurrentAssetList}
                overPageProps={{
                  onCloseComplete: onAssetModalClose,
                  confirmLabel: 'Duplicate',
                  isShown: props.match !== null,
                }}
                assetViewType='duplicate'
                {...props}
              />
            )}
          </Route>
          <Route exact sensitive path={['/home/gallery/editMultipleAssets', '/home/gallery/moveMultipleAssets']}>
            {props => (
              <MultipleAssets
                isShown={isMultipleAssetsShown}
                multipleAssets={{ ...multipleModalInfo, uploadingFiles: selectedMedia }}
                filterOptions={filterOptionsWithoutAll}
                updateProgramList={updateProgramList}
                initiateCurrentAssetList={initiateCurrentAssetList}
                onAssetModalClose={() => {
                  setSelectedMedia([])
                  setMultipleModalInfo({})
                  onAssetModalClose()
                }}
                action={showActionFooter}
                setShowActionFooter={setShowActionFooter}
                setIsMultipleAssetsShown={setIsMultipleAssetsShown}
                {...props}
              />
            )}
          </Route>
        </Switch>
        {isMultipleModalOpen && (
          <MultipleModal
            setIsMultipleModalOpen={setIsMultipleModalOpen}
            overPageProps={{
              onCloseComplete: () => setIsMultipleModalOpen(false),
              isShown: isMultipleModalOpen,
            }}
            showActionFooter={showActionFooter}
            setMultipleModalInfo={setMultipleModalInfo}
            setShowActionFooter={setShowActionFooter}
            setIsMultipleAssetsShown={setIsMultipleAssetsShown}
          />
        )}
        <div css={style.actionFooter(Boolean(showActionFooter))}>
          <div>
            <Button disabled={reachMaxSelectedAssets} onClick={handleSelectAll}>
              Select All
            </Button>
            <Button disabled={isSelectedMediaEmpty} marginLeft={25} onClick={handleUnselectAll}>
              Unselect All
            </Button>
          </div>
          <div css={style.rightButtonGroup()}>
            <Button
              onClick={() => {
                setSelectedMedia([])
                setShowActionFooter(ACTION_TYPES.NULL)
                setMultipleModalInfo({})
              }}
              disabled={isDownloading}
              marginRight={25}
            >
              Cancel
            </Button>
            {isMultipleDownload && (
              <Button
                onClick={() => onDownloadAssets()}
                disabled={isSelectedMediaEmpty}
                marginRight={25}
                isLoading={isDownloading}
                appearance='primary'
              >
                Download
              </Button>
            )}
            {isMultipleEdit && (
              <Button
                onClick={() => {
                  setIsMultipleAssetsShown(true)
                  history.push('/home/gallery/editMultipleAssets')
                }}
                disabled={isSelectedMediaEmpty}
                marginRight={25}
                appearance='primary'
              >
                Edit
              </Button>
            )}
            {isMultipleMove && (
              <Button
                onClick={() => {
                  setIsMultipleModalOpen(true)
                }}
                disabled={isSelectedMediaEmpty}
                marginRight={25}
                appearance='primary'
              >
                Move
              </Button>
            )}
            <div css={style.selectTextWrapper()}>
              <Text color={reachMaxSelectedAssets ? 'danger' : 'muted'}>
                {selectedMedia.length} Selected {reachMaxSelectedAssets && '(Limit)'}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Gallery.propTypes = propTypes
Gallery.defaultProps = defaultProps

export default hot(withRouter(Gallery))
