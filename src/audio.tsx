import { AudioContext, isSupported } from "standardized-audio-context";


let audioContext: AudioContext;

async function createAudioContext() {
  if (!audioContext) {
    const supported = await isSupported();

    if (!supported) {
      throw new Error("AudioContext isn't supported");
    }

    audioContext = new AudioContext();
  }

  return audioContext;
}

export async function beep(volume = 50) {
  try {
    const audioContext = await createAudioContext();

    const oscillatorNode = audioContext.createOscillator();
    oscillatorNode.frequency.value = 250;
    oscillatorNode.type = "triangle";

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume * 0.01;

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;

    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    oscillatorNode.start(now);
    oscillatorNode.stop(now + 0.25);
  } catch (error) {
    console.error(error);
  }
}
