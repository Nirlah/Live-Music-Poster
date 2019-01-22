precision mediump float;

// Simplex ---------------------------------------------------------------------

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

// Fragment --------------------------------------------------------------------

uniform float factor;
uniform vec3 c0;
uniform vec3 c1;

void main() {
  float n = noise(gl_FragCoord.xy / vec2(factor));
  vec3 color = mix(c0, c1, n);
  gl_FragColor = vec4(color, 1.0);
}
