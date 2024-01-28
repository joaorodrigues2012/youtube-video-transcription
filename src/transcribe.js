import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;
env.useBrowserCache = false;
import { loadingMessage } from "./loading";

let data = null;

export async function transcribeAudio(){
  const options = {
    chunk_length_s: 30, 
    stride_length_s: 5,
    language: 'portuguese', 
    task: 'transcribe',
    return_timestamps: true,
  };

  try {
    loadingMessage('Iniciando a transcrição, por favor aguarde...');
    console.log('convertendo....');
    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
    data = await transcriber('../audio.mp3', options);

  } catch (error) {
    console.log('[ERROR_TRANSCRIBE]', error);
    throw new Error(error);
  }finally{
    return data;
  }
}