(() => {
  const section = document.querySelector('.signature');
  const THREE = window.THREE;
  if (!section || !THREE) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fallback = section.querySelector('h2');
  const stage = section.querySelector('.signature-stage');
  fetch('assets/hero/signature.mesh').then(response => response.arrayBuffer()).then(buffer => {
    const head = new Uint32Array(buffer, 0, 2);
    const count = head[0], faceCount = head[1];
    const points = new Int16Array(buffer, 8, count * 3);
    const faces = new Uint16Array(buffer, 8 + count * 6, faceCount);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) positions[i] = points[i] / 4096;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex([...faces]);
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({color:0x3c2ec8,roughness:.52,metalness:.14,side:THREE.DoubleSide});
    material.onBeforeCompile = shader => {
      shader.uniforms.wave = {value:0};
      shader.vertexShader = 'uniform float wave; varying vec3 vObjectPos; varying vec3 vObjNormal;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjectPos = position; vObjNormal = normal; transformed.z += sin(position.x * 3.2 - wave * 7.0) * wave * 0.14;');
      shader.fragmentShader = 'varying vec3 vObjectPos; varying vec3 vObjNormal;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        vec2 uvP = vObjectPos.xy * 1.45;
        vec2 cell = fract(uvP) - 0.5;
        vec2 cid = floor(uvP);
        float h = fract(sin(dot(cid, vec2(12.9898, 78.233))) * 43758.5453);
        float ring = smoothstep(0.03, 0.0, abs(length(cell) - 0.24)) * step(0.62, h);
        float squiggle = smoothstep(0.035, 0.0, abs(cell.y - sin(cell.x * 16.0) * 0.12)) * step(0.32, h) * step(h, 0.62);
        float dotMask = smoothstep(0.09, 0.06, length(cell - vec2(0.18, -0.15))) * step(h, 0.32);
        float frontMask = smoothstep(0.35, 0.75, abs(vObjNormal.z));
        vec3 accent = mix(vec3(0.18, 0.85, 0.96), vec3(0.98, 0.84, 0.24), step(0.5, fract(h * 7.3)));
        accent = mix(accent, vec3(0.98, 0.36, 0.56), step(0.75, fract(h * 13.1)));
        float motif = clamp(ring + squiggle + dotMask, 0.0, 1.0) * frontMask;
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.92, accent, motif * 0.9);
      `);
      material.userData.shader = shader;
    };
    const mesh = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    scene.add(mesh);
    scene.add(new THREE.AmbientLight(0xffffff, 1.85));
    const key = new THREE.DirectionalLight(0xf6f3ff, 3.6);
    key.position.set(-3.5, 5.5, 8.5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x887cff, 2.4);
    rim.position.set(4, -2.5, -5);
    scene.add(rim);
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
    const limitedDevice = innerWidth < 700 || (navigator.deviceMemory || 8) <= 4 || (navigator.hardwareConcurrency || 8) <= 4;
    renderer.setPixelRatio(Math.min(devicePixelRatio, limitedDevice ? 1 : 1.5));
    renderer.domElement.className = 'wordmark-scene';
    stage.append(renderer.domElement);
    fallback.style.opacity = '0';
    let progress = 0;
    function resize() {
      const width = stage.clientWidth, height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 19.5 : width < 1100 ? 14 : 10.2;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }
    resize();
    addEventListener('resize', resize);
    const trigger = window.ScrollTrigger && !reduced.matches ? ScrollTrigger.create({
      trigger:section,start:'top top',end:'bottom bottom',
      onUpdate:self => {progress=self.progress;renderScene();}
    }) : null;
    let visible = false, disposed = false;
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) renderScene();
    });
    observer.observe(section);
    function renderScene() {
      if (disposed || !visible) return;
      mesh.rotation.y = reduced.matches ? -.15 : (progress - .5) * .78;
      mesh.rotation.x = reduced.matches ? -.05 : (progress - .5) * -.2;
      if (material.userData.shader) material.userData.shader.uniforms.wave.value = reduced.matches ? 0 : Math.sin(progress * Math.PI);
      renderer.render(scene,camera);
    }
    addEventListener('pagehide', () => {
      disposed = true;
      observer.disconnect();
      removeEventListener('resize', resize);
      trigger?.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }, {once:true});
  }).catch(error => console.warn('Wordmark scene unavailable', error));
})();
