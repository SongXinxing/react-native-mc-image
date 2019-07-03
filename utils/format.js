import { Platform } from 'react-native';
import Ratio from './ratio';

const imgFormatFilter = (src, imgWidth = 0, imgHeight = 0) => {
  // 阿里云:前端主动添加size、format属性
  const formatList = [];
  if (imgWidth !== 0 || imgHeight !== 0) {
    formatList.push(`/resize,m_fixed,w_${parseInt(imgWidth * Ratio)},h_${parseInt(imgHeight * Ratio)}`);
  }
  if (Platform.OS !== 'ios') {
    formatList.push('/format,webp');
  }
  if (formatList.length) {
    return src.split('?')[0] + '?x-oss-process=image' + formatList.join('');
  }
  return src
  
};

export default imgFormatFilter;
