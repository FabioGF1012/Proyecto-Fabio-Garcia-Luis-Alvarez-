const SUPABASE_URL = "https://ohbdfxrglpwoulalnaat.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYmRmeHJnbHB3b3VsYWxuYWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTI1MDIsImV4cCI6MjEwNDUyODUwMn0.-r8LtIF0jfmP2gR62Egos1zoq-SdMrxjH4GsORXBJe0";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let palabras = [], index = 0;
const card = document.getElementById('mainCard');
const cardBack = document.querySelector('.card-back');

// Voltear la carta al hacer clic
card.onclick = () => card.classList.toggle('flipped');
cardBack.addEventListener('click', (event) => event.stopPropagation());

// Cargar las 10 cartas desde Supabase
async function cargar() {
    const { data, error } = await _supabase.from('palabras').select('*').order('id', { ascending: true });

    if (error) {
        console.error('No se pudieron cargar las palabras:', error.message);
        document.getElementById('txtIngles').innerText = 'Error al cargar las cartas';
        return;
    }

    palabras = data || [];
    render();
    renderListaVideos();
}

// Mostrar los datos de la carta actual
function render() {
    if (!palabras.length) return;
    card.classList.remove('flipped'); // Muestra siempre el frente al cambiar
    
    const p = palabras[index];
    document.getElementById('txtIngles').innerText = p.ingles;
    document.getElementById('txtEspanol').innerText = p.espanol;
    document.getElementById('imgMeme').src = p.meme_url;

    // Desactivar botones si estamos al inicio o al final
    document.getElementById('btnAnterior').disabled = (index === 0);
    document.getElementById('btnSiguiente').disabled = (index === palabras.length - 1);
}

function renderListaVideos() {
    const videoList = document.getElementById('videoList');
    videoList.replaceChildren();

    palabras.forEach((palabra) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = palabra.video_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = `${palabra.ingles} - Ver video`;
        item.appendChild(link);
        videoList.appendChild(item);
    });
}

function toggleVideos() {
    const videoSection = document.getElementById('videoSection');
    const btnVideos = document.getElementById('btnVideos');
    videoSection.hidden = !videoSection.hidden;
    btnVideos.innerText = videoSection.hidden ? 'Videos' : 'Ocultar videos';
}

// Funciones de los botones
function siguienteCarta() { if (index < palabras.length - 1) { index++; render(); } }
function anteriorCarta() { if (index > 0) { index--; render(); } }

cargar();
