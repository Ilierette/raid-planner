export const links = [
    {
        link: "https://game-tools-b5a6d.firebaseapp.com/",
        color: "primary",
        title: "Current link"
    },
    {
        link: "https://github.com/Ilierette/raid-planner",
        color: "secondary",
        title: "Repository"
    },
    {
        link: "https://slate.silveress.ie/docs_bns#introduction",
        color: "success",
        title: "BNS API"
    },
    {
        link: "https://reactjs.org/docs/hello-world.html",
        color: "danger",
        title: "React Docs"
    },
    {
        link: "http://eu-bns.ncsoft.com/ingame/bs/character/profile?c=Letty&s=207",
        color: "warning",
        title: "Ingame F2"
    }
]

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
            },
            {
                title: "Account settings",
                isChecked: false,
                checklist: [
                    {
                        title: "Change email",
                        isChecked: false,
                    },
                    {
                        title: "Change password",
                        isChecked: false,
                    }
                ]
            }
        ]
    },
    {
        title: "Raid table",
        isChecked: false,
        checklist: [
            {
                title: "table:",
                isChecked: false,
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
                isChecked: false,
                checklist: [
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
                isChecked: false,
                checklist: [
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
                title: "delete user",
                isChecked: false
            },
            {
                title: "set raid time:",
                isChecked: false,
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
            },
            {
                title: "recruit / apply modal",
                isChecked: false,
                checklist: [
                    {
                        title: "fields: nickname, class, requirements, experience, dps parse",
                        isChecked: false
                    }
                ]
            },
            {
                title: "Loot spilt",
                isChecked: false,
                checklist: [
                    {
                        title: "comparable with user eq or needs",
                        isChecked: false
                    },
                    {
                        title: "loot story / rng ratio calculations",
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