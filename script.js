const cancion = document.getElementById("cancion");
const songToggle = document.getElementById("song-toggle");
const songStatus = document.getElementById("song-status");

function setPlaybackState(isPlaying) {
  songToggle.textContent = isPlaying ? "Pausar 🎵" : "Reproducir 🎵";
  songToggle.setAttribute("aria-pressed", String(isPlaying));
}

songToggle.addEventListener("click", async () => {
  if (!cancion.paused) {
    cancion.pause();
    return;
  }

  songToggle.disabled = true;
  songStatus.textContent = "";

  try {
    await cancion.play();
  } catch (error) {
    songStatus.textContent = "No se pudo reproducir. Verifica que cancion.mp3 esté en esta carpeta.";
    console.error("No se pudo reproducir cancion.mp3:", error);
  } finally {
    songToggle.disabled = false;
  }
});

cancion.addEventListener("play", () => {
  setPlaybackState(true);
  songStatus.textContent = "";
});

cancion.addEventListener("pause", () => setPlaybackState(false));
cancion.addEventListener("ended", () => setPlaybackState(false));

cancion.addEventListener("error", () => {
  setPlaybackState(false);
  songStatus.textContent = "No se pudo cargar cancion.mp3. Revisa que esté en esta carpeta.";
});
