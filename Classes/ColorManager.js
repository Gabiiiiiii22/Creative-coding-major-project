// This class manages all the colors used in the artwork

class ColorManager {
  constructor() {

    // Store all colors in a palette object with its key (name) and HEX code
    this.palette = {
      background: '#E8E8E1',
      yellow: '#DFC324',
      gray: '#BDBFBB',
      blue1: '#013577',
      blue2: '#0351A0',
      red: '#AB2727',
    
    };
  }

    // Method to get all colors at once, for layoutGrid to call to pass the colours to the blocks when add new block
     getAllColors() {
        return this.palette;
     }
}