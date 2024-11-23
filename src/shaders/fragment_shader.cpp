varying float qnoise;

uniform float time;
uniform bool rgb;

uniform bool alternatecolor;

uniform float red;
uniform float green;
uniform float blue;

uniform bool qnoiseblue;
uniform bool qnoisegreen;
uniform bool qnoisered;

void main() {
  float r, g, b;

  if (rgb == true) {
    if (qnoisered == true) {
      r = abs(qnoise);
    } else {
      r = cos(qnoise + red);
    }

    if (qnoisegreen == true) {
      g = abs(qnoise);
    } else {
      g = cos(qnoise + green);
    }

    if (qnoiseblue == true) {
      b = abs(qnoise);
    } else {
      b = cos(qnoise + blue);
    }
  } else if (alternatecolor == true) {
    r = cos(qnoise + 0.5);
    g = abs(0.2);
    b = cos(qnoise - 0.5);
  } else {
    r = cos(qnoise + 0.5);
    g = abs(0.2);
    b = cos(qnoise - 0.5);
  }

  gl_FragColor = vec4(r, g, b, 1.0);
}