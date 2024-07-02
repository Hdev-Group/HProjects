export function Critical(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-xl critical live gap-2">
        P1-Critical
        </div>
        </div>
    )
}
export function High(){
    return(
        <div className="flex items-center gap-4 justify-between">
        <div className="flex h-[20px] items-center justify-center p-3 high rounded-xl live gap-2">
        P2-High
        </div>
        </div>
    )
}
export function Medium(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center medium justify-center p-3 rounded-xl developing gap-2">
        P3-Medium
        </div>
        </div>
    )
}
export function Low(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center low p-3 rounded-xl planning gap-2">
        P4-Low
        </div>
        </div>
    )
}
export function Feature(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] feature items-center justify-center p-3 rounded-xl feture gap-2">
        P5-Feature
        </div>
        </div>
    )
}
export function Security(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center security justify-center p-3 rounded-xl live gap-2">
        PS-Security
        </div>
        </div>)
}
