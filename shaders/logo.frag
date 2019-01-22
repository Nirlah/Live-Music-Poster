precision mediump float;

varying vec2 vUv;

uniform sampler2D textMap;
uniform sampler2D mixMap;
uniform float mixAmount;

#define CHECKER_SIZE 25.0

// #define DEBUG

void main() {
  vec4 textTexel = texture2D(textMap, vUv.xy);
  float greyLevel = 1.0 - textTexel.r;
  float isText = step(0.1, greyLevel);

  // Back Layer

  vec3 colorText = vec3(0.99, 0.2, 0.42);

  float xCell = floor(gl_FragCoord.x / CHECKER_SIZE);
  float yCell = floor(gl_FragCoord.y / CHECKER_SIZE);
  float isCell = mod(xCell + yCell, 2.0);
  vec3 colorBg = mix(vec3(0.88), vec3(1.0), isCell);

  vec3 backLayerColor = mix(colorBg, colorText, isText);

  // Front Layer

  float isBigText = step(0.2, greyLevel);
  vec3 textBig0 = vec3(1.0, 0.4, 0.23);
  vec3 textBig1 = vec3(1.0, 0.44, 0.66);
  vec3 textBig = mix(textBig0, textBig1, vUv.y);
  vec3 textSmall = vec3(0.34, 0.19, 0.56);
  vec3 frontText = mix(textSmall, textBig, isBigText);

  vec3 frontBg = vec3(1.0);
  vec3 frontLayerColor = mix(frontBg, frontText, isText);

  // Mix layers
  float mixTextel = texture2D(mixMap, vUv.xy).r;
  float mixVal = step(mixAmount, mixTextel);
  vec3 color = mix(backLayerColor, frontLayerColor, mixVal);

#ifdef DEBUG
  gl_FragColor = vec4(vec3(mixTextel), 1.0);
#else
  gl_FragColor = vec4(color, 1.0);
#endif
}