export const handleErrorResponseObject = (error) => {
  if (error.response && error.response.data.error) {
    throw new Error(error.response.data.error);
  } else if (error.response) {
    throw new Error(error.response.statusText);
  } else {
    throw new Error(error.message);
  }
};

export const handleTryErrorResonseObject = (error) => {
  if(error.response && error.response.data) {
    throw new Error(error.response.data);
  }else{
    throw new Error(error.response.statusText);
  }
}

export const dataTable = [
  [
    'NorthWest Co.',
    'Pam Beesley',
    '24m',
    '7/12 Active Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Southwest Co.',
    'Michael Scott',
    '14h 51m',
    '4/6 Active Users',
    '$78,712',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Winery. Inc',
    'Kevin Malone',
    '36h 12m',
    '8/16 Active Users',
    '$107,568',
    'Mid',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Snickers Ltd.',
    'Angela Martin',
    '18h 41m',
    '24/54 Active Users',
    '$3,093,992',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Balenciaga Co.',
    'Andrew Bernard',
    '82h 11m',
    '14/79 Active Users',
    '$490,213',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Bose',
    'Dwighit Schrute',
    '8h 58m',
    '6/8 Active Users',
    '$55,976',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Leafers Ltd.',
    'Jim Halpert',
    '102h 46m',
    '45/84 Inactive Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'NorthWest Co.',
    'Pam Beesley',
    '24m',
    '7/12 Active Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Southwest Co.',
    'Michael Scott',
    '14h 51m',
    '4/6 Active Users',
    '$78,712',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Winery. Inc',
    'Kevin Malone',
    '36h 12m',
    '8/16 Active Users',
    '$107,568',
    'Mid',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Snickers Ltd.',
    'Angela Martin',
    '18h 41m',
    '24/54 Active Users',
    '$3,093,992',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Balenciaga Co.',
    'Andrew Bernard',
    '82h 11m',
    '14/79 Active Users',
    '$490,213',
    'Enterprise',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Bose',
    'Dwighit Schrute',
    '8h 58m',
    '6/8 Active Users',
    '$55,976',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ],
  [
    'Leafers Ltd.',
    'Jim Halpert',
    '102h 46m',
    '45/84 Inactive Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120'
  ]
];
export const contract_dataTable_object = [
  [
    'NorthWest Co.',
    53562,
    '$4,525,00',
    '12/05/20',
    '12/08/20',
    '3',
    '2020',
    '$104,234',
    '3',
    'Enterprise',
    'Dwight Schrute',
    '$540',
    '$325',
    '$232',
    '$23'
  ],
  [
    'Inter Co.',
    1242,
    '$4,525,00',
    '12/05/20',
    '14/08/20',
    '3',
    '2424',
    '$104,234',
    '3',
    'Enterprise',
    'John Doe ',
    '$5420',
    '$1325',
    '$24232',
    '$243'
  ],
  [
    'NorthWest Co.',
    53562,
    '$4,525,00',
    '12/05/20',
    '12/08/20',
    '3',
    '2020',
    '$104,234',
    '3',
    'Enterprise',
    'Dwight Schrute',
    '$540',
    '$325',
    '$232',
    '$23'
  ]
];

export const contract_dataTable = [
  [
    'NorthWest Co.',
    '353',
    '$734',
    '12/04/20',
    '15/06/20',
    '2',
    '2020',
    '$104,233',
    '3',
    'Enterprise',
    'Pam Beesley',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Southwest Co.',
    'Michael Scott',
    '14h 51m',
    '4/6 Active Users',
    '$78,712',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Winery. Inc',
    'Kevin Malone',
    '36h 12m',
    '8/16 Active Users',
    '$107,568',
    'Mid',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Snickers Ltd.',
    'Angela Martin',
    '18h 41m',
    '24/54 Active Users',
    '$3,093,992',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Balenciaga Co.',
    'Andrew Bernard',
    '82h 11m',
    '14/79 Active Users',
    '$490,213',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Bose',
    'Dwighit Schrute',
    '8h 58m',
    '6/8 Active Users',
    '$55,976',
    'SMB',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Leafers Ltd.',
    'Jim Halpert',
    '102h 46m',
    '45/84 Inactive Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'NorthWest Co.',
    'Pam Beesley',
    '24m',
    '7/12 Active Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Southwest Co.',
    'Michael Scott',
    '14h 51m',
    '4/6 Active Users',
    '$78,712',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Winery. Inc',
    'Kevin Malone',
    '36h 12m',
    '8/16 Active Users',
    '$107,568',
    'Mid',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Snickers Ltd.',
    'Angela Martin',
    '18h 41m',
    '24/54 Active Users',
    '$3,093,992',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Balenciaga Co.',
    'Andrew Bernard',
    '82h 11m',
    '14/79 Active Users',
    '$490,213',
    'Enterprise',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Bose',
    'Dwighit Schrute',
    '8h 58m',
    '6/8 Active Users',
    '$55,976',
    'SMB',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ],
  [
    'Leafers Ltd.',
    'Jim Halpert',
    '102h 46m',
    '45/84 Inactive Users',
    '$734',
    'SMB',
    '16 Jun, 2020',
    '-120',
    '$213',
    '$235',
    '$310',
    '$540'
  ]
];

// Today's task list
export const taskListToday = [
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '20%',
    comments: 0,
    isActive: true,
    assign: ['Andrew', 'Mark', 'Ana', 'Chris', 'Jessica']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '50%',
    comments: 2,
    isActive: true,
    assign: ['Mark', 'Ana']
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '80%',
    comments: 1,
    isActive: false,
    assign: []
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '40%',
    comments: 4,
    isActive: true,
    assign: ['Andrew', 'Mark', 'Ana', 'Erica']
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 0,
    isActive: true,
    assign: ['Andrew', 'Mark']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '50%',
    comments: 0,
    isActive: true,
    assign: ['Andrew', 'Mark', 'Ana']
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '70%',
    comments: 1,
    isActive: false,
    assign: ['Andrew', 'John']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '50%',
    comments: 3,
    isActive: true,
    assign: ['Andrew']
  }
];

// Tomorrow's task list
export const taskListTomorrow = [
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '70%',
    isActive: true,
    assign: ['Andrew', 'Mark', 'Ana', 'Erica']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '50%',
    isActive: true,
    assign: ['Andrew', 'Erica']
  }
];

// Expiring in next 7 day's task list
export const taskListExpiring = [
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '70%',
    isActive: true,
    assign: ['Andrew']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '40%',
    isActive: true,
    assign: ['Andrew']
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '80%',
    isActive: true,
    assign: ['Andrew', 'Erica']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '90%',
    isActive: true,
    assign: ['Andrew', 'Mark']
  }
];

// Completed task list
export const taskListCompleted = [
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 2,
    isActive: false,
    assign: []
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 0,
    isActive: false,
    assign: ['Andrew']
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 0,
    isActive: false,
    assign: []
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 4,
    isActive: false,
    assign: []
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 1,
    isActive: false,
    assign: []
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 0,
    isActive: false,
    assign: []
  },
  {
    type1: 'Schedule QBR',
    type2: 'Green Crop',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 0,
    isActive: false,
    assign: ['Andrew', 'Mark']
  },
  {
    type1: 'Check Usage',
    type2: 'Apple Inc.',
    date: '-2 days (04/24/20)',
    progress: '100%',
    comments: 3,
    isActive: false,
    assign: ['Andrew', 'Mark']
  }
];

// Account Management Accounts

export const AM_period_dataTable_economics = [
  ['LTV:CAC', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['CAC', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['MRR Churn', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['AVG MRR', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Software Margin', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['LTV', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],

  ['Marketing Expense', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  [
    'New Customers Added in Period',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' '
  ],
  ['Customer Lifetime (Months)', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Payback Period (Months)', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67]
];

export const AM_period_dataTable = [
  ['Live Users', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Reports Created', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Templates Total', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Forums Completed Total', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67]
];

// Unit economics data

export const Unit_economics_data = [
  [
    "LTV:CAC",
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45,
    1.45
  ],
  [
    "CAC",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000"
  ],
  [
    "MRR Churn",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%",
    "2.30%"
  ],
  [
    "AVG MRR",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400",
    "$400"
  ],
  [
    "Software Margin",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%",
    "82%"
  ],
  [
    "LTV",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000",
    "$17,000"
  ],
  [
    "Marketing Expense",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000",
    "$12,000"
  ],
  [
    "New Customers Added in Period",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "Customer Lifetime(Months)",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43",
    "43"
  ],
  [
    "Payback Period(Months)",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3"
  ],


];

export const AM_period_dataTable_header = [
  ' ',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
export const AM_period_dataTableSpacing_economics =
  '190px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';

export const AM_period_dataTableSpacing =
  '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';

export const AM_account_dataTable = [
  ['1', 213, 213, 213, 213, 213],
  ['2', 61, 61, 61, 61, 61],
  ['3', 712, 712, 712, 712, 712],
  ['4', 123, 123, 123, 123, 123],
  ['5', 213, 213, 213, 213, 213]
];

export const AM_account_dataTable_header = [
  ' ',
  'Account Name',
  'Total ARR Start of Year',
  'Expansion ARR During Year',
  'Downsell During Year',
  'Upsell During Year'
];

export const AM_account_dataTableSpacing = '2fr 1fr 1fr 1fr 1fr 1fr';

export const AM_period_chart = [
  {
    month: 'Jan',
    value: 320,
    PercentageShow: '1000%'
  },
  {
    month: 'Fed',
    value: 250,
    PercentageShow: '10%'
  },
  {
    month: 'Mar',
    value: 310,
    PercentageShow: '23%'
  },
  {
    month: 'Apr',
    value: 290,
    PercentageShow: '48%'
  },
  {
    month: 'May',
    value: 356,
    PercentageShow: '67%'
  },
  {
    month: 'Jun',
    value: 190,
    PercentageShow: '75%'
  },
  {
    month: 'Jul',
    value: 260,
    PercentageShow: '89%'
  },
  {
    month: 'Aug',
    value: 254,
    PercentageShow: '75%'
  },
  {
    month: 'Sep',
    value: 358,
    PercentageShow: '92%'
  },
  {
    month: 'Oct',
    value: 340,
    PercentageShow: '78%'
  },
  {
    month: 'Nov',
    value: 290,
    PercentageShow: '56%'
  },
  {
    month: 'Dec',
    value: 200,
    PercentageShow: '23%'
  }
];

export const AM_period_chart_1 = [
  {
    month: 'Jan',
    value: 100,
    PercentageShow: '50%'
  },
  {
    month: 'Fed',
    value: 350,
    PercentageShow: '10%'
  },
  {
    month: 'Mar',
    value: 310,
    PercentageShow: '23%'
  },
  {
    month: 'Apr',
    value: 290,
    PercentageShow: '48%'
  },
  {
    month: 'May',
    value: 356,
    PercentageShow: '67%'
  },
  {
    month: 'Jun',
    value: 190,
    PercentageShow: '75%'
  },
  {
    month: 'Jul',
    value: 175,
    PercentageShow: '89%'
  },
  {
    month: 'Aug',
    value: 254,
    PercentageShow: '75%'
  },
  {
    month: 'Sep',
    value: 358,
    PercentageShow: '92%'
  },
  {
    month: 'Oct',
    value: 95,
    PercentageShow: '78%'
  },
  {
    month: 'Nov',
    value: 292,
    PercentageShow: '56%'
  },
  {
    month: 'Dec',
    value: 207,
    PercentageShow: '23%'
  }
];

export const AM_product_engagement_chart = [
  {
    month: 'Northeast',
    value: 320,
    PercentageShow: '50%'
  },
  {
    month: 'Balenciaga',
    value: 250,
    PercentageShow: '10%'
  },
  {
    month: 'Off-White',
    value: 310,
    PercentageShow: '23%'
  },
  {
    month: 'Apple',
    value: 290,
    PercentageShow: '48%'
  },
  {
    month: 'Starbucks',
    value: 356,
    PercentageShow: '67%'
  },
  {
    month: 'Lighter Inc.',
    value: 190,
    PercentageShow: '75%'
  },
  {
    month: 'Refreshments Co.',
    value: 260,
    PercentageShow: '89%'
  },
  {
    month: 'Catapults',
    value: 358,
    PercentageShow: '92%'
  },
  {
    month: 'Rockets & Science',
    value: 340,
    PercentageShow: '78%'
  },
  {
    month: '45 RPM',
    value: 290,
    PercentageShow: '56%'
  },
  {
    month: 'Not Secret Company',
    value: 200,
    PercentageShow: '23%'
  },
  {
    month: 'Unique Inc',
    value: 320,
    PercentageShow: '66%'
  }
];
export const AM_growth_dataTableSpacing = '1fr 1fr 1fr 1fr 1fr';

export const AM_growth_table_head = [
  '',
  'Annual Revenue',
  '2017',
  '2018',
  '2019'
];
export const AM_growth_table = [
  ['Northeast', '$234', '$2,354', '$343', '$234'],
  ['Balenciaga', '$234', '$2,354', '$343', '$234'],
  ['Off-White', '$234', '$2,354', '$343', '$234'],
  ['Apple', '$234', '$2,354', '$343', '$234'],
  ['Starbucks', '$234', '$2,354', '$343', '$234'],
  ['Lighter Inc.', '$234', '$2,354', '$343', '$234'],
  ['Refreshments Co.', '$234', '$2,354', '$343', '$234'],
  ['Catapults', '$234', '$2,354', '$343', '$234'],
  ['Rockets & Science', '$234', '$2,354', '$343', '$234'],
  ['45 RPM', '$234', '$2,354', '$343', '$234'],
  ['Not Secret Company', '$234', '$2,354', '$343', '$234'],
  ['Unic inc', '$234', '$2,354', '$343', '$234'],
  ['Total', '$2324', '$11,354', '$3343', '$9234']
];

export const AM_account_chart = [
  {
    month: 'Northeast',
    value: 320
  },
  {
    month: 'Balenciaga',
    value: 250
  },
  {
    month: 'Off-White',
    value: 310
  },
  {
    month: 'Apple',
    value: 290
  },
  {
    month: 'Starbucks',
    value: 356
  },
  {
    month: 'Lighter Inc.',
    value: 190
  },
  {
    month: 'Refreshments Co.',
    value: 260
  },
  {
    month: 'Catapults',
    value: 358
  },
  {
    month: 'Rockets & Science',
    value: 340
  },
  {
    month: '45 RPM',
    value: 290
  },
  {
    month: 'Not Secret Company',
    value: 200
  },
  {
    month: 'Unic inc',
    value: 320
  }
];

export const AM_account_manager_chart = [
  {
    month: 'Andrew Bernard',
    value: 320,
    PercentageShow: '50%'
  },
  {
    month: 'Angela Martin',
    value: 250,
    PercentageShow: '10%'
  },
  {
    month: 'Ryan Howard',
    value: 310,
    PercentageShow: '23%'
  },
  {
    month: 'Dwight Schrute',
    value: 290,
    PercentageShow: '48%'
  },
  {
    month: 'Erin Hannon',
    value: 356,
    PercentageShow: '67%'
  },
  {
    month: 'Jim Halpert',
    value: 190,
    PercentageShow: '75%'
  },
  {
    month: 'Phyllis Smith',
    value: 260,
    PercentageShow: '89%'
  },
  {
    month: 'Kelly Kapoor',
    value: 358,
    PercentageShow: '92%'
  },
  {
    month: 'Kevin Malone',
    value: 340,
    PercentageShow: '78%'
  },
  {
    month: 'Stanley Hudson',
    value: 290,
    PercentageShow: '56%'
  },
  {
    month: 'Michael Scott',
    value: 200,
    PercentageShow: '23%'
  }
];

export const AM_account_period_chart = [
  {
    month: 'Jan',
    Balenciaga: 40,
    'Off-White': 62,
    Apple: 34,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Feb',
    Balenciaga: 120,
    'Off-White': 84,
    Apple: 43,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Mar',
    Balenciaga: 130,
    'Off-White': 75,
    Apple: 67,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Apr',
    Balenciaga: 80,
    'Off-White': 125,
    Apple: 33,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'May',
    Balenciaga: 122,
    'Off-White': 67,
    Apple: 78,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Jun',
    Balenciaga: 60,
    'Off-White': 93,
    Apple: 33,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Jul',
    Balenciaga: 143,
    'Off-White': 62,
    Apple: 86,
    Starbucks: 33,
    'Casa De Tono': 35
  },
  {
    month: 'Aug',
    Balenciaga: 136,
    'Off-White': 104,
    Apple: 55,
    Starbucks: 55,
    'Casa De Tono': 35
  },
  {
    month: 'Sep',
    Balenciaga: 71,
    'Off-White': 104,
    Apple: 71,
    Starbucks: 50,
    'Casa De Tono': 85
  },
  {
    month: 'Oct',
    Balenciaga: 111,
    'Off-White': 124,
    Apple: 40,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Nov',
    Balenciaga: 147,
    'Off-White': 58,
    Apple: 33,
    Starbucks: 50,
    'Casa De Tono': 35
  },
  {
    month: 'Dec',
    Balenciaga: 101,
    'Off-White': 84,
    Apple: 83,
    Starbucks: 50,
    'Casa De Tono': 35
  }
];

export const AM_account_manager_period_chart = [
  {
    month: 'Jan',
    'Andy Bernard': 70,
    'Angela Martin': 62,
    'Ryan Howard': 34,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Feb',
    'Andy Bernard': 100,
    'Angela Martin': 84,
    'Ryan Howard': 43,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Mar',
    'Andy Bernard': 130,
    'Angela Martin': 125,
    'Ryan Howard': 67,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Apr',
    'Andy Bernard': 80,
    'Angela Martin': 125,
    'Ryan Howard': 33,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'May',
    'Andy Bernard': 220,
    'Angela Martin': 67,
    'Ryan Howard': 78,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Jun',
    'Andy Bernard': 60,
    'Angela Martin': 93,
    'Ryan Howard': 33,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Jul',
    'Andy Bernard': 143,
    'Angela Martin': 62,
    'Ryan Howard': 86,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Aug',
    'Andy Bernard': 120,
    'Angela Martin': 104,
    'Ryan Howard': 55,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Sep',
    'Andy Bernard': 71,
    'Angela Martin': 104,
    'Ryan Howard': 77,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Oct',
    'Andy Bernard': 111,
    'Angela Martin': 124,
    'Ryan Howard': 40,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Nov',
    'Andy Bernard': 117,
    'Angela Martin': 58,
    'Ryan Howard': 33,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  },
  {
    month: 'Dec',
    'Andy Bernard': 101,
    'Angela Martin': 84,
    'Ryan Howard': 20,
    'Dwight Schrute': 50,
    'Staney Halpert': 35
  }
];

export const AM_account_manager_dataTable = [
  ['Managed Revenue', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Top 10 Accounts', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Top 20 Accounts', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Top 10% Accounts', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67],
  ['Top 20% Accounts', 23, 12, 56, 78, 96, 34, 73, 21, 11, 7, 23, 67]
];

export const AM_account_manager_dataTable_header = [
  ' ',
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

export const AM_account_manager_dataTableSpacing =
  '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
