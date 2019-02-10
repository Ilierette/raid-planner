export const initDays = [
    //Wednesday
    {
        date: "21.01",
        min: "16:00",
        max: "23:00"
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
        date: "22.01",
        min: "12:00",
        max: "24:00"
    },
    //Monday
    {
        date: "",
        min: "",
        max: ""
    },
    //Tuesday
    {
        date: "23.01",
        min: "14:00",
        max: "24:00"
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