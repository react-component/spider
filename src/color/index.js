import color from 'color';

class SpiderColor {
  darken(colorString, alpha) {
    return color(colorString).darken(alpha).hexString();
  }
}

export default new SpiderColor();
