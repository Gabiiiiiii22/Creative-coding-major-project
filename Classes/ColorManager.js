class ColorManager {
  constructor() {
    this.palette = {
      background: '#E8E8E1',
      yellow: '#DFC324',
      gray: '#BDBFBB',
      blue1: '#013577',
      blue2: '#0351A0',
      red1: '#AB2727',
      red2: '#A9201E',
      black: '#000000'
    };
  }

  getAllColors() {
    return this.palette;
  }
}