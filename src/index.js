import React, { Component } from "react"
import ReactDOM from "react-dom"
import Hammer from "hammerjs"

import updateSelf from "./lib/updateSelf"
import eventsMap from "./lib/events"

const privateProps = {
    children: true,
    direction: true,
    options: true,
    recognizeWith: true,
    vertical: true
}

for (const event of eventsMap.keys()) {
    privateProps[event] = true
}

export default class HammerComponent extends Component {
    constructor(props) {
        super(props)
        this.hammer = {}
    }

    updateHammer() {
        updateSelf(Hammer, this.hammer, this.props)
    }

    componentDidMount() {
        this.hammer = new Hammer(this.domElement)
        this.updateHammer()
    }

    componentDidUpdate() {
        if (!this.hammer) {
            return
        }
        this.updateHammer()
    }

    componentWillUnmount() {
        if (this.hammer) {
            this.hammer.stop()
            this.hammer.destroy()
        }
        this.hammer = null
    }

    render() {
        const self = this
        const props = {}

        Object.keys(this.props).forEach(function(i) {
            if (!privateProps[i]) {
                props[i] = this.props[i]
            }
        }, this)

        props.ref = function(domElement) {
            if (self.props.ref) {
                self.props.ref(domElement)
            }
            self.domElement = domElement
        }

        return React.cloneElement(
            React.Children.only(this.props.children),
            props
        )
    }
}
