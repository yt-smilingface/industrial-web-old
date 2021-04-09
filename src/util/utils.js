
// 通过地州编码转换成地州简称
export function govChange(data) {
  switch(data) {
    case '530100':
      return '昆明'
    case '530300':
      return '曲靖'
    case '530400':
      return '玉溪'
    case '530500':
      return '保山'
    case '530600':
      return '昭通'
    case '530700':
      return '丽江'
    case '530800':
      return '普洱'
    case '530900':
      return '临沧'
    case '532300':
      return '楚雄'
    case '532500':
      return '红河'
    case '532600':
      return '文山'
    case '532800':
      return '西双版纳'
    case '532900':
      return '大理'
    case '533100':
      return '德宏'
    case '533300':
      return '怒江'
    case '533400':
      return '迪庆'
  }
}

// 通过地州简称转换成地州编码
export function govStringChange(data) {
  switch(data) {
    case '昆明':
      return '530100'
    case '曲靖':
      return '530300'
    case '玉溪':
      return '530400'
    case '保山':
      return '530500'
    case '昭通':
      return '530600'
    case '丽江':
      return '530700'
    case '普洱':
      return '530800'
    case '临沧':
      return '530900'
    case '楚雄':
      return '532300'
    case '红河':
      return '532500'
    case '文山':
      return '532600'
    case '西双版纳':
      return '532800'
    case '大理':
      return '532900'
    case '德宏':
      return '533100'
    case '怒江':
      return '533300'
    case '迪庆':
      return '533400'
    }
}