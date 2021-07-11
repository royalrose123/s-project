// 客戶要求日期顯示 'dd/MM/YYYY' 格式，但 new Date() 不接受 'dd/MM/YYYY' 格式，所以喂給 new Date() 的日期都要轉成 'MM/dd/YYYY'
// 顯示時再另外轉成 'dd/MM/YYYY' 格式
export const transferDateToUSFormat = date => {
  if (typeof date !== 'string') return date

  const newDate = date.split('/')

  const newDateDay = newDate[0]
  const newDateMonth = newDate[1]
  const newDateYear = newDate[2]

  return `${newDateMonth}/${newDateDay}/${newDateYear}`
}
