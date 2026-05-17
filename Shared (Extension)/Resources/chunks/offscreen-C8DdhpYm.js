import { t as browser } from "./browser-DV2XfOQj.js";
//#region extension/entrypoints/offscreen/offscreen.ts
function playAudio({ src, volume }) {
	const audio = new Audio(src);
	audio.volume = volume;
	audio.play();
}
function playTTS({ text, volume, voice, rate }) {
	const ttsMessage = new SpeechSynthesisUtterance(text);
	ttsMessage.volume = volume;
	if (voice !== "default") {
		const matchedVoice = window.speechSynthesis.getVoices().find(({ name, lang }) => `${name} (${lang})` === voice);
		if (matchedVoice) ttsMessage.voice = matchedVoice;
	}
	ttsMessage.rate = rate;
	window.speechSynthesis.speak(ttsMessage);
}
browser.runtime.onMessage.addListener((message) => {
	if (message.offscreen === "audio") playAudio(message);
	else if (message.offscreen === "tts") playTTS(message);
});
//#endregion

//# sourceMappingURL=offscreen-C8DdhpYm.js.map