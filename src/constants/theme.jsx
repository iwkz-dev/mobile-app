import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#D0E7D2',
    black: '#000000',
    white: '#FFFFFF',
    secondary: '#527853',
    grey: '#4C4C4C',
};

export const SIZES = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,

    width,
    height,
}