// Google フォーム / GAS 連携の定数。送信先URL・entry IDは現行サイトから変更しないこと。
export const GAS_URL =
  'https://script.google.com/macros/s/AKfycbyrqkmWaOwlfK84gDJLNf5MGxg0e37F_nkqrt4G7gcYArFWPoiylDwdDOK3a1vtToEw/exec';

export const GOOGLE_FORM_ID = '1FAIpQLSfmEH4wNFCSdSgLxkOA0Znicf5wZ48MWuNzTQXTRcXmX7iudg';

// Google フォームの各設問 entry ID
export const FORM_ENTRY = {
  name: 'entry.1664544387',
  mail: 'entry.1284687787',
  instagram: 'entry.170230722',
  message: 'entry.243692601',
  area: 'entry.2127967699',
  type: 'entry.1564782994',
} as const;
