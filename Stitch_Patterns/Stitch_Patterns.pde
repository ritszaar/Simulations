// ID: JbfhzlMk2eY
Stitch stitch;

void setup() {
  size(1000, 800);
  stitch = new Stitch("314159265358979323846", reverseString("MAYTHEFORCEBEWITHYOU"));
}

void draw() {
  background(0);
  stitch.display();
}

String reverseString(String str) {
  String nstr = "";
  for (int i=0; i<str.length(); i++) {
        char ch= str.charAt(i); //extracts each character
        nstr= ch + nstr; //adds each character in front of the existing string
  }
  return nstr;
}
