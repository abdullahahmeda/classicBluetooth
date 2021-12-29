import React, { Component } from 'react-native'
import ReactNativeEventEmitter from 'ReactNativeEventEmitter'
import NodeHandle from 'NodeHandle'

export const multitouchable = BaseComponent => {
  return class extends Component {
    constructor (props, context) {
      super(props, context)

      this.comp = null
      this.compId = null
    }

    componentDidMount () {
      if (this.comp && this.compId) {
        this.comp.onTouchStart && ReactNativeEventEmitter.putListener(this.compId, 'onTouchStart', e => this.comp.onTouchStart(e))
        this.comp.onTouchEnd && ReactNativeEventEmitter.putListener(this.compId, 'onTouchEnd', e => this.comp.onTouchEnd(e))
        this.comp.onTouchMove && ReactNativeEventEmitter.putListener(this.compId, 'onTouchMove', e => this.comp.onTouchMove(e))
      }
    }

    componentWillUnmount () {
      if (this.comp && this.compId) {
        this.comp.onTouchStart && ReactNativeEventEmitter.deleteListener(this.compId, 'onTouchStart')
        this.comp.onTouchEnd && ReactNativeEventEmitter.deleteListener(this.compId, 'onTouchEnd')
        this.comp.onTouchMove && ReactNativeEventEmitter.deleteListener(this.compId, 'onTouchMove')
      }
    }

    render () {
      return (
        <BaseComponent
          {...this.props}
          {...this.state}
          ref={c => {
            this.comp = c
            const handle = React.findNodeHandle(c)
            if (handle) this.compId = NodeHandle.getRootNodeID(handle)
          }}
        />
      )
    }
  }
}
