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
		
		const hatAclip = await loadAudio("./sound/hat.mp3");
		const hatListener = new THREE.AudioListener();
		const hatAudio = new THREE.PositionalAudio(hatListener);
		
		const igloo = await loadGLTF("./igloo/scene.gltf");
		igloo.scene.scale.set(0.2, 0.2, 0.2); 
		igloo.scene.position.set(0.1, -0.5, 0); 
		
		const iglooAclip = await loadAudio("./sound/igloo.mp3");
		const iglooListener = new THREE.AudioListener();
		const iglooAudio = new THREE.PositionalAudio(iglooListener);
		
		const jelly = await loadGLTF("./jelly/scene.gltf");
		jelly.scene.scale.set(0.5, 0.5, 0.5); 
		jelly.scene.position.set(0.1, -0.6, 0); 
		
		const jellyAclip = await loadAudio("./sound/jelly.mp3");
		const jellyListener = new THREE.AudioListener();
		const jellyAudio = new THREE.PositionalAudio(jellyListener);
		
		
		const hatAnchor = mindarThree.addAnchor(0);
		hatAnchor.group.add(hat.scene);
		
		camera.add(hatListener);
		hatAudio.setRefDistance(100);
		hatAudio.setBuffer(hatAclip);
		hatAudio.setLoop(true);
		hatAnchor.group.add(hatAudio);
		hatAnchor.onTargetFound = () => {
			hatAudio.pause();
		}
		
		hatAnchor.onTargetLost = () => {
			hatAudio.play();
		
		const iglooAnchor = mindarThree.addAnchor(1);
		iglooAnchor.group.add(igloo.scene);
		
		camera.add(iglooListener);
		iglooAudio.setRefDistance(100);
		iglooAudio.setBuffer(iglooAclip);
		iglooAudio.setLoop(true);
		iglooAnchor.group.add(iglooAudio);
		iglooAnchor.onTargetFound = () => {
			iglooAudio.pause();
		}
		
		iglooAnchor.onTargetLost = () => {
			iglooAudio.play();
		
		const jellyAnchor = mindarThree.addAnchor(2);
		jellyAnchor.group.add(jelly.scene);
		
		camera.add(jellyListener);
		jellyAudio.setRefDistance(100);
		jellyAudio.setBuffer(jellyAclip);
		jellyAudio.setLoop(true);
		jellyAnchor.group.add(jellyAudio);
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