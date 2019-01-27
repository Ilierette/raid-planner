export const initDays = [
    //Wednesday
    {
        date: "",
        min: "",
        max: ""
    },
    //Thursday
    {
        date: "",
        min: "",
        max: ""
    },
    //Friday
    {
        date: "",
        min: "",
        max: ""
    },
    //Saturday
    {
        date: "",
        min: "",
        max: ""
    },
    //Sunday
    {
        date: "",
        min: "",
        max: ""
    },
    //Monday
    {
        date: "",
        min: "",
        max: ""
    },
    //Tuesday
    {
        date: "",
        min: "",
        max: ""
    }
]

export const raid = [
    {
        type: "TT", //BT, VT, TT, ET
        ratio: "28.11.2018 - 05.15.2018",
        timestamp: "17:00 29.11.2018",
        maxMembers: 12,
        members: [
            {
                id: "letty",
                isFounder: true,
                isLeader: true,
                isStatic: true,
                isConfirmed: true,
                isExpanded: false,
                notes: "",
                days: initDays
            }
        ],

        isEditMode: false,
        isAddMode: false,
        isLeader: true,
    },
    {
        type: "VT", //BT, VT, TT, ET
        ratio: "28.11.2018 - 05.15.2018",
        timestamp: "17:00 29.11.2018",
        maxMembers: 12,
        members: [
            {
                id: "letty",
                isFounder: true,
                isLeader: false,
                isStatic: true,
                isConfirmed: true,
                isExpanded: false,
                notes: "",
                days: initDays
            }
        ],

        isEditMode: false,
        isAddMode: false,
        isLeader: false
    }

]