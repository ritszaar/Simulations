// Link - hSsRcpIsunk
Eye eye;

void setup() {
  size(1200, 900);
  eye = new Eye(150);
}

void draw() {
  background(eye.g);
  eye.display();
  eye.update();
}
