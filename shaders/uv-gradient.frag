precision mediump float;

varying vec2 vUv;

uniform vec3 c0;
uniform vec3 c1;

void main() {
  gl_FragColor = vec4(mix(c0, c1, vUv.y), 0.0);
}