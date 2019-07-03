import * as React from 'react'
import {
    FlexStyle,
    LayoutChangeEvent,
    ShadowStyleIOS,
    StyleProp,
    TransformsStyle,
} from 'react-native'

declare namespace MCImage {
    namespace priority {
        type low = 'low'
        type normal = 'normal'
        type high = 'high'
    }

    namespace resizeMode {
        type contain = 'contain'
        type cover = 'cover'
        type stretch = 'stretch'
        type center = 'center'
    }

    namespace cacheControl {
        type cacheOnly = 'cacheOnly'
        type immutable = 'immutable'
        type web = 'web'
    }

    export type Priority =
        | MCImage.priority.low
        | MCImage.priority.normal
        | MCImage.priority.high

    export type ResizeMode =
        | MCImage.resizeMode.contain
        | MCImage.resizeMode.cover
        | MCImage.resizeMode.stretch
        | MCImage.resizeMode.center

    export type Cache =
        | MCImage.cacheControl.cacheOnly
        | MCImage.cacheControl.immutable
        | MCImage.cacheControl.web
}

export type MCImageSource = {
    uri?: string
    headers?: { [key: string]: string }
    priority?: MCImage.Priority
    cache?: MCImage.Cache
}

export interface ImageStyle extends FlexStyle, TransformsStyle, ShadowStyleIOS {
    backfaceVisibility?: 'visible' | 'hidden'
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    borderRadius?: number
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    overlayColor?: string
    tintColor?: string
    opacity?: number
}

export interface OnLoadEvent {
    nativeEvent: {
        width: number
        height: number
    }
}

export interface OnProgressEvent {
    nativeEvent: {
        loaded: number
        total: number
    }
}

export interface MCImageProperties {
    source: MCImageSource | number | string
    resizeMode?: MCImage.ResizeMode
    fallback?: boolean
    ossWidth?: number
    ossHeight?: number
    ossUrl?: string

    onLoadStart?(): void

    onProgress?(event: OnProgressEvent): void

    onLoad?(event: OnLoadEvent): void

    onError?(): void

    onLoadEnd?(): void

    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height}}}.
     */
    onLayout?: (event: LayoutChangeEvent) => void

    /**
     *
     * Style
     */
    style?: StyleProp<ImageStyle>

    /**
     * A unique identifier for this element to be used in UI Automation testing scripts.
     */
    testID?: string
}

interface MCImageStatic extends React.ComponentClass<MCImageProperties> {
    resizeMode: {
        contain: MCImage.resizeMode.contain
        cover: MCImage.resizeMode.cover
        stretch: MCImage.resizeMode.stretch
        center: MCImage.resizeMode.center
    }

    priority: {
        low: MCImage.priority.low
        normal: MCImage.priority.normal
        high: MCImage.priority.high
    }

    cacheControl: {
        cacheOnly: MCImage.cacheControl.cacheOnly
        immutable: MCImage.cacheControl.immutable
        web: MCImage.cacheControl.web
    }

    preload(sources: MCImageSource[]): void
}

declare var MCImage: MCImageStatic

type MCImage = MCImageStatic

export function MCImageInitBaseUrl (url: string) {}

export default MCImage
