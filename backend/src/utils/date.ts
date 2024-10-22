export const oneYearFromNow=()=>{
    return new Date(
        Date.now() + 365*24*60*60*1000
    )
}

// new Date(...): Converts the future timestamp (one year from now)
// into a Date object, which represents the future date.

export const thirtyDaysFromNow=()=>{
    return new Date(
        30*24*60*60*1000 + Date.now()
    )
}

export const fifteenMinutesFromNow=()=>{
    return new Date(
        15*60*1000 + Date.now()
    )
}