export const billListData = {
    pay: [
      {
        type: 'foods',
        name: 'food',
        list: [
          { type: 'food', name: 'Meal' },
          { type: 'drinks', name: 'drinks' },
          { type: 'dessert', name: 'desert' },
        ],
      },
      {
        type: 'taxi',
        name: 'transportation',
        list: [
          { type: 'taxi', name: 'taxi' },
          { type: 'longdistance', name: 'fare' },
        ],
      },
      {
        type: 'recreation',
        name: 'entertainment',
        list: [
          { type: 'bodybuilding', name: 'sports' },
          { type: 'game', name: 'game' },
          { type: 'audio', name: 'audio' },
          { type: 'travel', name: 'travel' },
        ],
      },
      {
        type: 'daily',
        name: 'daily_expenses',
        list: [
          { type: 'clothes', name: 'clothes' },
          { type: 'bag', name: 'shoes/bags' },
          { type: 'book', name: 'learning' },
          { type: 'promote', name: 'ability' },
          { type: 'home', name: 'furnished' },
        ],
      },
      {
        type: 'other',
        name: 'other',
        list: [{ type: 'community', name: 'community maintance' }],
      },
    ],
    income: [
      {
        type: 'professional',
        name: 'other',
        list: [
          { type: 'salary', name: 'salary' },
          { type: 'overtimepay', name: 'extra work' },
          { type: 'bonus', name: 'bonus' },
        ],
      },
      {
        type: 'other',
        name: 'other income',
        list: [
          { type: 'financial', name: 'financial' },
          { type: 'cashgift', name: 'cashgift' },
        ],
      },
    ],
  }
  
  export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
      bill.list.forEach(item => {
        prev[item.type] = item.name
      })
    })
    return prev
  }, {})