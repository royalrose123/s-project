const LIBRARY_PAGES = {
  MAIN: 'main',
  INNER_PAGE: 'innerPage',
  PREVIEW_PAGE: 'previewPage',
}

const LIBRARY_CATEGORIES = {
  QUICKSIGHT: 'Quicksight',
  PRESENTATION: 'Presentation',
  DATA_RESOURCE: 'Data resource',
  EXTERNAL_URL: 'External URL',
}

const SECTION_TITLE = {
  [LIBRARY_CATEGORIES.QUICKSIGHT]: 'Quicksight Dashboards',
  [LIBRARY_CATEGORIES.PRESENTATION]: 'Presentation Resources',
  [LIBRARY_CATEGORIES.DATA_RESOURCE]: 'Data Resources',
  [LIBRARY_CATEGORIES.EXTERNAL_URL]: 'Useful Links',
}

const pageVariants = {
  initial: direction => ({
    opacity: 1,
    x: direction === MOTION_DIRECTION.NEXT ? '-100%' : '100%',
    scale: 1,
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: direction => ({
    opacity: 1,
    x: direction === MOTION_DIRECTION.PREV ? '-100%' : '100%',
    scale: 1,
  }),
}

const pageTransition = {
  x: { type: 'spring', stiffness: 300, damping: 200 },
  opacity: { duration: 0.6 },
}
// slider actions
const MOTION_DIRECTION = {
  NEXT: 1,
  PREV: -1,
}

const EXTENSIONS = {
  PDF: 'pdf',
  MP4: 'mp4',
  XLSX: 'xlsx',
  DOCX: 'docx',
  PPTX: 'pptx',
  JPG: 'jpg',
  PNG: 'png',
}

const SORT_TYPE_TEXT = {
  MOST_FREQUENTLY_USED: 'Most frequently used',
  LAST_OPENED: 'Last opened',
  LAST_MODIFIED: 'Last modified',
}

const SORT_TYPE_PARAM = {
  [SORT_TYPE_TEXT.MOST_FREQUENTLY_USED]: 'count_click',
  [SORT_TYPE_TEXT.LAST_OPENED]: 'last_open_time',
  [SORT_TYPE_TEXT.LAST_MODIFIED]: 'updated_time',
}

const sortOptions = [
  { label: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED, value: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED },
  { label: SORT_TYPE_TEXT.LAST_OPENED, value: SORT_TYPE_TEXT.LAST_OPENED },
  { label: SORT_TYPE_TEXT.LAST_MODIFIED, value: SORT_TYPE_TEXT.LAST_MODIFIED },
]

// 觸發 keyword 搜尋的字元數下限
const TRIGGER_SEARCH_THRESHOLD = 3

const CONTROL_PANEL_THEME = {
  DARK: 'dark',
  LIGHT: 'light',
}

export {
  LIBRARY_CATEGORIES,
  LIBRARY_PAGES,
  SECTION_TITLE,
  SORT_TYPE_TEXT,
  SORT_TYPE_PARAM,
  EXTENSIONS,
  pageVariants,
  pageTransition,
  MOTION_DIRECTION,
  sortOptions,
  TRIGGER_SEARCH_THRESHOLD,
  CONTROL_PANEL_THEME,
}
