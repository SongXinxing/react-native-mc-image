import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  NativeModules,
  requireNativeComponent,
  ViewPropTypes,
  StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'

import imgFormatFilter from './utils/format'

let baseUrl = null

function MCImageBase ({
  ossWidth,
  ossHeight,
  ossUrl = baseUrl,
  source,
  forwardedRef,
  children,
  mode,
  ...props
}) {
  if (typeof source === 'string') {
    source = {
      uri: source
    }
  }
  let preUrl = ossUrl
  if (typeof source === 'object' && source !== null && preUrl) {
    let { uri = '' } = source
    if (uri.indexOf('http') === -1) {
      source.uri = imgFormatFilter(preUrl + uri, ossWidth, ossHeight, mode)
    }
  }
  return (
    <FastImage
      source={source}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </FastImage>
  )
}

const MCImageMemo = memo(MCImageBase)

const MCImage = forwardRef((props, ref) => (
  <MCImageMemo forwardedRef={ref} {...props} />
))
MCImage.displayName = 'MCImage'

MCImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
}

MCImage.priority = {
  // lower than usual.
  low: 'low',
  // normal, the default.
  normal: 'normal',
  // higher than usual.
  high: 'high',
}

MCImage.cacheControl = {
  // Ignore headers, use uri as cache key, fetch only if not in cache.
  immutable: 'immutable',
  // Respect http headers, no aggressive caching.
  web: 'web',
  // Only load from cache.
  cacheOnly: 'cacheOnly',
}

MCImage.preload = sources => {
  FastImageViewNativeModule.preload(sources)
}

MCImage.defaultProps = {
  resizeMode: FastImage.resizeMode.cover,
}

const MCImageSourcePropType = PropTypes.shape({
  uri: PropTypes.string,
  headers: PropTypes.objectOf(PropTypes.string),
  priority: PropTypes.oneOf(Object.keys(FastImage.priority)),
  cache: PropTypes.oneOf(Object.keys(FastImage.cacheControl)),
})

MCImage.propTypes = {
  ...ViewPropTypes,
  source: PropTypes.oneOfType([MCImageSourcePropType, PropTypes.number, PropTypes.string]),
  ossWidth: PropTypes.number,
  ossHeight: PropTypes.number,
  ossUrl: PropTypes.string,
  tintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoadStart: PropTypes.func,
  onProgress: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onLoadEnd: PropTypes.func,
  fallback: PropTypes.bool,
  ossWidth: PropTypes.number,
  ossHeight: PropTypes.number
}

export function MCImageInitBaseUrl (url) {
  baseUrl = url
}

export default MCImage
