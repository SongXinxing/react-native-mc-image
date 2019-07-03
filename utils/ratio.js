import { PixelRatio } from 'react-native';

const Ratio = PixelRatio.get();

export default Ratio ? parseInt(Ratio) : 2;
