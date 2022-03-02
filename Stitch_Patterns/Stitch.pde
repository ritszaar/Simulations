class Stitch {
  String mainPattern, crossPattern;
  int rows, cols;
  float xRes, yRes;
  
  Stitch(String mainPattern_, String crossPattern_) {
    mainPattern = mainPattern_;
    crossPattern = crossPattern_;
    rows = crossPattern.length();
    cols = mainPattern.length();
    xRes = width/cols;
    yRes = height/rows;
  }
  
  void display() {
    stroke(0, 255, 0);
    strokeWeight(2);
    for (int i = 0; i < rows; i++) {
      if (crossPatternParity(crossPattern.charAt(i))) {
        for (int j = 1; j + 1 < cols; j += 2) {
            float x = xRes * j + xRes/2;
            float y = yRes * i + yRes/2;
            line(x, y, x + xRes, y);
        }
      }
      else {
        for (int j = 0; j + 1 < cols; j += 2) {
            float x = xRes * j + xRes/2;
            float y = yRes * i + yRes/2;
            line(x, y, x + xRes, y);
        }
      }
    }
    
    for (int j = 0; j < cols; j++) {
      if (mainPatternParity(mainPattern.charAt(j))) {
        for (int i = 1; i + 1 < rows; i += 2) {
            float x = xRes * (j + 1) + xRes/2;
            float y = yRes * i + yRes/2;
            line(x, y, x, y + yRes);
        }
      }
      else {
        for (int i = 0; i + 1 < rows; i += 2) {
            float x = xRes * (j + 1) + xRes/2;
            float y = yRes * i + yRes/2;
            line(x, y, x, y + yRes);
        }
      }
    }
    
    stroke(255);
    strokeWeight(8);
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        float x = xRes * j + xRes/2;
        float y = yRes * i + yRes/2;
        point(x, y);
      }
    }
  }
  
  boolean crossPatternParity(char c) {
    char vowels[] = {'a', 'e', 'i', 'o', 'u'};
    c = Character.toLowerCase(c);
    for (char x : vowels) {
      if (c == x) return true;
    }
    return false;
  }
  
  boolean mainPatternParity(char c) {
    int bit = int(c);
    return bit % 2 == 1;
  }
}
