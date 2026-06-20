export const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */`
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2  uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform vec2  uResolution;

  varying vec2 vUv;

  float bayer8(int x, int y) {
    int b[64];
    b[0]=0;  b[1]=32; b[2]=8;  b[3]=40; b[4]=2;  b[5]=34; b[6]=10; b[7]=42;
    b[8]=48; b[9]=16; b[10]=56;b[11]=24;b[12]=50;b[13]=18;b[14]=58;b[15]=26;
    b[16]=12;b[17]=44;b[18]=4; b[19]=36;b[20]=14;b[21]=46;b[22]=6; b[23]=38;
    b[24]=60;b[25]=28;b[26]=52;b[27]=20;b[28]=62;b[29]=30;b[30]=54;b[31]=22;
    b[32]=3; b[33]=35;b[34]=11;b[35]=43;b[36]=1; b[37]=33;b[38]=9; b[39]=41;
    b[40]=51;b[41]=19;b[42]=59;b[43]=27;b[44]=49;b[45]=17;b[46]=57;b[47]=25;
    b[48]=15;b[49]=47;b[50]=7; b[51]=39;b[52]=13;b[53]=45;b[54]=5; b[55]=37;
    b[56]=63;b[57]=31;b[58]=55;b[59]=23;b[60]=61;b[61]=29;b[62]=53;b[63]=21;
    return float(b[y * 8 + x]);
  }

  void main() {
    vec2 uv = vUv;

    /* — cursor ripple displacement — */
    vec2 delta = uv - uMouse;
    float dist = length(delta);
    float ripple = sin(dist * 22.0 - uTime * 2.8) * exp(-dist * 5.0) * 0.018;
    uv += normalize(delta + 0.0001) * ripple;

    /* — idle ambient shimmer — */
    uv.x += sin(uv.y * 6.0 + uTime * 0.4) * 0.003 * (1.0 - uHover);

    uv = clamp(uv, 0.0, 1.0);

    vec4 tex   = texture2D(uTexture, uv);
    float lum  = dot(tex.rgb, vec3(0.2126, 0.7152, 0.0722));

    /* — Bayer ordered dither — */
    int px = int(mod(gl_FragCoord.x, 8.0));
    int py = int(mod(gl_FragCoord.y, 8.0));
    float threshold = bayer8(px, py) / 64.0;

    /* hover resolves the dither toward clarity */
    float t = mix(threshold, 0.0, uHover * 0.85);
    float dithered = step(t, lum);

    vec3 dark  = vec3(0.043, 0.043, 0.047);  /* --color-bg  */
    vec3 light = vec3(0.929, 0.929, 0.925);  /* --color-text */
    vec3 ditherColor = mix(dark, light, dithered);

    /* accent tint on resolve */
    vec3 accent = vec3(0.796, 0.749, 0.659); /* #CBBFA8 */
    vec3 resolved = mix(tex.rgb, tex.rgb * 0.85 + accent * 0.15, uHover * 0.3);

    vec3 final = mix(ditherColor, resolved, uHover);

    /* circular alpha mask */
    float r = length(vUv - 0.5);
    float mask = 1.0 - smoothstep(0.48, 0.5, r);

    gl_FragColor = vec4(final, mask);
  }
`;
