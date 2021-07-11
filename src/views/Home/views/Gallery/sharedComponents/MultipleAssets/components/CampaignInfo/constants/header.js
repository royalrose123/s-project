export const HEADER_WIDTH = {
  ROW_INDEX: 32,
  PROGRAM: 240,
  CAMPAIGN_NAME: 320,
  CAMPAIGN_RUNNING_DATE: 360,
  CAMPAIGN_DESCRIPTION: 500,
}

export const headerList = [
  { content: '', width: HEADER_WIDTH.ROW_INDEX, isFixed: true },
  { content: 'Program', width: HEADER_WIDTH.PROGRAM, isFixed: false },
  { content: 'Campaign Name', width: HEADER_WIDTH.CAMPAIGN_NAME, isFixed: false },
  { content: 'Campaign Running Date', width: HEADER_WIDTH.CAMPAIGN_RUNNING_DATE, isFixed: false },
  { content: 'Campaign Description', width: HEADER_WIDTH.CAMPAIGN_DESCRIPTION, isFixed: false },
]
