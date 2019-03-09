export const data = [
    {
        title: "User profile",
        checklist: [
            {
                title: "list of owned mats",
                isChecked: true
            },
            {
                title: "character data",
                isChecked: true
            },
            {
                title: "character search",
                isChecked: true
            }
        ]
    },
    {
        title: "Raid table",
        checklist: [
            {
                title: "table:",
                checklist: [
                    {
                        title: "fields (name, class, hours, notes, isMain, isStatic)",
                        isChecked: true
                    },
                    {
                        title: "start time and end time from all selected hours, minimum raid duration",
                        isChecked: false
                    },
                    {
                        title: "raid flags (raid avaiable, raid unavaiable)",
                        isChecked: false
                    },
                    {
                        title: "sheet lockout - can't recive any updates from user untill specific conditions (time, or when raid leader take down lockout)",
                        isChecked: false
                    },
                    {
                        title: "time count down and warning",
                        isChecked: false
                    }
                ]
            },
            {
                title: "add user:",
                checklist:[
                    {
                        title: "character data modal",
                        isChecked: true
                    },
                    {
                        title: "raid leader search for a member (valid in-game username) by autosuggest field based on registered users (userConfirmed - false)",
                        isChecked: true
                    },
                    {
                        title: "user get notification to confirm, then he appear on table (userConfirmed - true)",
                        isChecked: false
                    },
                    {
                        title: "fields are loaded from user profile (class, isMain)",
                        isChecked: true
                    }
                ]
            },
            {
                title: "edit hours:",
                checklist:[
                    {
                        title: "editable fields by lider - isStatic, notes",
                        isChecked: true
                    },
                    {
                        title: "editable fields by user - only his own hours",
                        isChecked: true
                    }
                ]
            },
            {
                title: "delete user"
            },
            {
                title: "set raid time:",
                checklist: [
                    {
                        title: "first in - then user gets locked in that time from other raids",
                        isChecked: false
                    },
                    {
                        title: "user gets notification ( Push notification to discord Bot )",
                        isChecked: false
                    }
                ]
            }
        ]
    },
    {
        title: "Look for clan",
        extra: "Comming soon..."
    },
    {
        title: "Gear upgrade table",
        extra: "Comming soon..."
    },
    {
        title: "Ingame activity tracker",
        checklist: [
            {
                title: "globally set (start, end, duration of event, rewards, tokens, activity to do)",
                isChecked: false
            },
            {
                title: "additional activity - Dailly Challenge, Weekly Challenge, PvP, Toi, Solo content (and rewards from it)",
                isChecked: false
            },
            {
                title: "user can add other characters",
                isChecked: false
            },
            {
                title: "easy to scale and calculate",
                isChecked: false
            }
        ]
    }
]