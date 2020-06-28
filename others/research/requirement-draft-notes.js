
/*
Questions:

Is it worth it for you? having a customizable Dashboard to easily naviage & show only what you want to the end users?
    For me?
        improve your working efficiency even by reducing your time consumption by atleast 5 minutes or so
        a good skill dev time for me to spend on a side project. keep myself busy.
        i am on mvp v1.0 try out path and so far; its very interesting and got few promising resulsts.

    For you?

What would you expect the Dashboard to do?
    Everything editable? title, story points
    what would you expect an initial mock up ui be? (show the recent sprint where david used the custom score report)
*/

finalJSONDATA = {
    pageTitle: '',
    pageSubtitles: [
        {
            name: 'subtitle1',
            contents: {
                contentKey1: 'value1',
                contentKey2: 'value2',
                contentKey3: 'value3',
            }
        },
        {
            name: 'subtitle2',
            contents: {
                contentKey1: 'value1',
                contentKey2: 'value2',
                contentKey3: 'value3',
            }
        },
    ],
}

finalJSONDATA = {
    pageTitle: '',
    pageSubtitles: [
        {
            name: 'subtitle1',
            show: boolean,
            contents: {
                ...jsonData[0]
            }
        },
    ],
}


finalJSONDATA = {
    pageTitle: '',

    pageSubtitles: [
        {
            subtitle: {
                show: false || true,
                name: string
            },
            subtitleContents: {
                show: false || true,
                contents: {
                    ...jsonData[x]
                }
            }
        }
    ]
}



nextPageJSONData = {
    pageTitle: string,
    groupings: [
        {
            groupingBy: 'State',
            groupingItems: [
                {
                    itemTitle: 'TX',
                    show: true,
                    items: [{
                        ...initialDraftJSONData
                        // that contains state as 'TX'
                    }]
                },
                {
                    itemTitle: 'NY',
                    show: true,
                    items: [{
                        ...initialDraftJSONData,
                        // that contains state as 'NY'
                        show: false
                    }]
                },

            ]
        },
        {
            groupingBy: 'Zipcode',
            groupingItems: [
                {
                    itemTitle: '8071',
                    show: true,
                    items: [{
                        ...initialDraftJSONData,
                        // that contains Zipcode as '8071'
                    }]
                },
                {
                    itemTitle: '901',
                    show: true,
                    items: [{
                        ...initialDraftJSONData,
                        //that contains Zipcode as '901'
                        show: false
                    }]
                },

            ]
        }
    ]
}



{
    pageTitle: string,
        grouping_identifiers: [
            // grouping
            {
                grouping_identifier: string,
                grouping_items: [grouping_item1, grouping_item2]
            }
        ],
            grouping_items: []
}



First Name: "John"
Last Name: "Doe"




// for #19, antd table thingy
const mockColumns = [
    {
        title: 'First Name',
        dataIndex: 'First Name',
        key: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'Last Name',
        key: 'last_name',
    },
];

const mockData = [
    {
        key: '1',
        'First Name': 'John',
        'Last Name': 'Doe',
    },
    {
        key: '1',
        'First Name': 'Vivek',
        'Last Name': 'Vellai',
    },
];

<Table columns={mockColumns} dataSource={mockData} />




// for addressess.csv
// jsonDataHeaderTitle: ["First Name", "Last Name", "Address 1", "City", "State", "Zipcode"]
// 1stObj: { First Name: "John", Last Name: "Doe", Address 1: "120 jefferson st.", City: "Riverside", State: " NJ", Zipcode: 8075 }

// finalJSONDATA = {
//     pageTitle: 'Address Book',
//     pageSubtitles: [
//         {
//             name: `${jsonDataHeaderTitle['First Name']} Address book`,
//             contents: {
//                 { First Name: "John", Last Name: "Doe", Address 1: "120 jefferson st.", City: "Riverside", State: " NJ", Zipcode: 8075 },
//         { First Name: "Stephen", Last Name: "Tyler", Address 1: "7452 Terrace "At the Plaza" road", City: "SomeTown", State: "SD", Zipcode: 0909 }
//             }
//         }
//     ],
// }





// let nextPageFinalJSONData = finalJSONData.grouping_identifiers.map(
//     (groupingIdentifier) => {
//         let currentGroupingItemsArr: {
//             itemTitle: any;
//             items: any;
//             show: boolean;
//         }[] = [];

//         let grouped = groupBy(jsonData, (data) => data[groupingIdentifier]);

//         grouped.forEach((value: any, key: any) => {
//             currentGroupingItemsArr.push({
//                 itemTitle: key,
//                 items: value,
//                 show: true,
//             });
//         });

//         groupingsArr.push({
//             groupingBy: groupingIdentifier,
//             groupingItems: currentGroupingItemsArr,
//         });

//         currentGroupingItemsArr = [];

//         return {
//             pageTitle: finalJSONData.pageTitle,
//             groupings: groupingsArr,
//         };
//     }
// );