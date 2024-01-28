import axios from 'axios';
import { startLoading, stopLoading, loadingMessage} from './loading.js'
import { getVideoId, loadVideo } from './youtube-api.js';
import { transcribeAudio } from './transcribe.js';
import { renderText } from './render.js';

const form = document.querySelector("#form");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    loadingMessage('Iniciando a aplicação');
    startLoading();

    const formData = new FormData(form);
    const url = formData.get('url');
    await loadVideo(url);

    loadingMessage('Baixando o vídeo');
    await axios.get('http://localhost:3333/audio?v=' + getVideoId(url));

    const data = await transcribeAudio();
    
    renderText(data);

  } catch (error) {
    console.log('[SUBMIT_ERROR]', error);
  }finally{
    stopLoading();
  }
});