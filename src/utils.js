function timeDifference(current,previous){
    const milliSecondsPerMinute = 60 * 1000
    const milliSecondsPerHour = milliSecondsPerMinute * 60
    const milliSecondsPerDay = milliSecondsPerHour * 24
    const milliSecondPerMonth = milliSecondsPerDay * 30
    const milliSecondPerYear = milliSecondsPerDay * 365

    const elapsed = current - previous

    if (elapsed < milliSecondsPerMinute / 3){
        return 'just now'
    }

    if (elapsed < milliSecondsPerMinute){
        return 'Less than 1 min ago'
    } else if (elapsed < milliSecondsPerHour){
        return Math.round(elapsed /milliSecondsPerMinute ) + 'min ago'
    } else if (elapsed < milliSecondsPerDay){
        return Math.round(elapsed / milliSecondsPerHour) + 'h ago'
    } else if (elapsed < milliSecondPerYear){
        return Math.round(elapsed / milliSecondsPerDay) + 'days ago'
    } else if (elapsed < milliSecondPerYear){
        return Math.round(elapsed/milliSecondPerMonth) + ' mo ago'
    } else{
        return Math.round(elapsed / milliSecondPerYear) + ' years ago'
    }
}


export function timeDifferenceForDate(date){
    const now = new Date().getTime()
    const updated = new Date(date).getTime()
    return timeDifference(now, updated)
}