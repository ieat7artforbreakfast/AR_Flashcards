const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF, loadAudio} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
	const start = async() => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: './hij.mind',
			maxTrack: 3,
		});
		
		const {renderer, scene, camera} = mindarThree;
		
		const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
		scene.add(light);
		
		const hat = await loadGLTF("./hat/scene.gltf");
		hat.scene.scale.set(0.2, 0.2, 0.2); 
		hat.scene.position.set(0, -0.3, 0); 
		
		const igloo = await loadGLTF("./igloo/scene.gltf");
		igloo.scene.scale.set(0.2, 0.2, 0.2); 
		igloo.scene.position.set(0.1, -0.5, 0); 
		
		const jelly = await loadGLTF("./jelly/scene.gltf");
		jelly.scene.scale.set(0.5, 0.5, 0.5); 
		jelly.scene.position.set(0.1, -0.6, 0);
		
		
		const hatAnchor = mindarThree.addAnchor(0);
		hatAnchor.group.add(hat.scene);
		
		hatAnchor.onTargetFound = () => {
			hatAudio.pause();
		}
		
		hatAnchor.onTargetLost = () => {
			hatAudio.play();
		
		const iglooAnchor = mindarThree.addAnchor(1);
		iglooAnchor.group.add(igloo.scene);
		
		
		iglooAnchor.onTargetFound = () => {
			iglooAudio.pause();
		}
		
		iglooAnchor.onTargetLost = () => {
			iglooAudio.play();
		
		const jellyAnchor = mindarThree.addAnchor(2);
		jellyAnchor.group.add(jelly.scene);
		
		
		jellyAnchor.onTargetFound = () => {
			jellyAudio.pause();
		}
		
		jellyAnchor.onTargetLost = () => {
			jellyAudio.play();
		
		
		await mindarThree.start();
		
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
		
	
		}
	start();
});
