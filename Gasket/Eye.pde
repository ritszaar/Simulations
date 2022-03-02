class Eye {
  PGraphics g;
  float res;
  int rows, cols, drawerRow, drawerCol;
  PVector pivot, mover, drawer, observer, moverCenter;
  float angle;
  boolean shouldJoin;
  
  Eye(float res_) {
    g = createGraphics(width, height);
    res = res_;
    rows = floor(height/res);
    cols = floor(width/res);
    pivot = new PVector(2 * res, height - res);
    mover = new PVector(0, 0);
    drawer = new PVector(0, 0);
    observer = new PVector(0, 0);
    moverCenter = new PVector(0, 0);
    angle = 0;
    drawerRow = rows - 5;
    drawerCol = 0;
    setMoverCenter();
    setDrawerAndObserver();
    
    shouldJoin = false;
    
    g.beginDraw();
    g.background(0);
    g.stroke(120);
    g.strokeWeight(1);
    for (int i = 1; i < rows; i++) {
      float y = res * i;
      g.line(0, y, width, y);
    }
    for (int j = 1; j < cols; j++) {
      float x = res * j;
      g.line(x, 0, x, height);
    }
    g.stroke(255);
    g.noFill();
    g.line(0, height - 2 * res, width, height - 2 * res);
    g.circle(3 * res/2, height - res, res);
    g.endDraw();
  }
  
  void display() {
    stroke(255);
    strokeWeight(12);
    point(pivot.x, pivot.y);
    point(mover.x, mover.y);
    point(drawer.x, drawer.y);
    point(observer.x, observer.y);
    stroke(0, 0, 255);
    strokeWeight(2);
    fill(0, 0, 255, 120);
    beginShape();
    vertex(pivot.x, pivot.y);
    vertex(mover.x, mover.y);
    vertex(observer.x, observer.y);
    vertex(drawer.x, drawer.y);
    endShape(CLOSE);
  }
  
  void update() {
    PVector pMover = mover.copy();
    PVector pDrawer = drawer.copy();
    mover.x = moverCenter.x + res * cos(angle) / 2;
    mover.y = moverCenter.y + res * sin(angle) / 2;
    angle += 0.05;
    setDrawerAndObserver();
    
    if (shouldJoin) {
      g.beginDraw();
      g.line(pMover.x, pMover.y, mover.x, mover.y);
      g.line(pDrawer.x, pDrawer.y, drawer.x, drawer.y);
      g.endDraw();
      if (angle > TWO_PI + 0.2) {
        angle = 0;
        drawerCol++;
        if (drawerCol > (cols - 1 + (drawerRow - (rows - 5)))) {
          drawerCol = (rows - 5 - drawerRow);
          drawerRow++;
        }
        setMoverCenter();
      }
    }
    else shouldJoin = true;
  }
  
  void setMoverCenter() {
    moverCenter.x = drawerCol * res + res/2;
    moverCenter.y = drawerRow * res + res/2;
    shouldJoin = false;
  }
  
  void setDrawerAndObserver() {
    float normal = (res * res)/(PVector.dist(mover, pivot));
    PVector offset = PVector.sub(mover, pivot);
    PVector normalVector = PVector.fromAngle(offset.heading() - PI/2);
    normalVector.setMag(normal);
    drawer = PVector.add(normalVector, pivot);
    observer = PVector.add(drawer, offset);
  }
}
