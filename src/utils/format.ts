import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const formatUTC = (time: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs.utc(time).utcOffset(8).format(format)
}

export const formatMoney = (value: string | number) => {
  return value + '¥'
}
