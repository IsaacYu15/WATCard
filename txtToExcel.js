const xlsx = require('xlsx')
const txt = xlsx.readFile('data.txt')
xlsx.writeFile(txt, 'WatCardExcelSheet.xls')