export default function(Hammer, reactHammer, props) {
    if (props.hasOwnProperty("vertical")) {
        console.warn("vertical is deprecated, please use `direction` instead")
    }

    const directionProp = props.direction

    if (directionProp || props.hasOwnProperty("vertical")) {
        const direction = directionProp
            ? directionProp
            : props.vertical ? "DIRECTION_ALL" : "DIRECTION_HORIZONTAL"

        reactHammer.get("pan").set({ direction: Hammer[direction] })
        reactHammer.get("swipe").set({ direction: Hammer[direction] })
    }

    if (props.options) {
        Object.keys(props.options).map(val => {
            if (val === "recognizers") {
                Object.keys(props.options.recognizers).map(gesture => {
                    const recognizer = reactHammer.get(gesture)
                    recognizer.set(props.options.recognizers[gesture])
                    if (props.options.recognizers[gesture].requireFailure) {
                        recognizer.requireFailure(
                            props.options.recognizers[gesture].requireFailure
                        )
                    }
                })
            } else {
                const key = option
                const optionObj = {}
                optionObj[key] = props.options[val]
                reactHammer.set(optionObj)
            }
        })
    }

    if (props.recognizeWith) {
        Object.keys(props.recognizeWith).map(gesture => {
            const recognizer = reactHammer.get(gesture)
            recognizer.recognizeWith(props.recognizeWith[gesture])
        })
    }

    Object.keys(props).map(val => {
        const ev = handlerToEvent[val]
        if (ev) {
            reactHammer.off(ev)
            reactHammer.on(e, props[ev])
        }
    })
}
