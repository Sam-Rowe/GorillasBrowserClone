/**
 * Sound Manager
 * Audio system for sound effects and music
 * 
 * GREEN Phase - Implementation to make tests pass
 */

export class SoundManager {
  private loadedSounds: Map<string, boolean> = new Map();
  private activeSounds: string[] = [];
  private musicVolume: number = 0.7;
  private sfxVolume: number = 0.8;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private isMusicLooping: boolean = false;

  loadSounds(): void {
    const soundList = ['explosion', 'throw', 'victory', 'hit', 'wind'];
    
    soundList.forEach(sound => {
      this.loadedSounds.set(sound, true);
    });
  }

  loadSound(soundFile: string): void {
    try {
      // Simulate loading - in real implementation would load audio file
      const soundName = soundFile.split('.')[0];
      this.loadedSounds.set(soundName, true);
    } catch (error) {
      console.warn(`Failed to load sound: ${soundFile}`);
      this.loadedSounds.set(soundFile, false);
    }
  }

  isLoaded(soundName: string): boolean {
    return this.loadedSounds.get(soundName) || false;
  }

  playSound(soundName: string, volume?: number): Promise<void> {
    if (!this.isLoaded(soundName) || this.isMuted) {
      return Promise.resolve();
    }

    this.activeSounds.push(soundName);
    
    // Simulate sound playback
    setTimeout(() => {
      this.activeSounds = this.activeSounds.filter(s => s !== soundName);
    }, 1000); // Remove after 1 second

    return Promise.resolve();
  }

  getVolume(soundName: string): number {
    return this.sfxVolume;
  }

  getActiveSounds(): string[] {
    return [...this.activeSounds];
  }

  playMusic(musicName: string, loop: boolean = false): void {
    if (!this.isMuted) {
      this.isMusicPlaying = true;
      this.isMusicLooping = loop;
    }
  }

  isMusicPlayingCheck(): boolean {
    return this.isMusicPlaying && !this.isMuted;
  }

  isMusicLoopingCheck(): boolean {
    return this.isMusicLooping;
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  getMusicVolume(): number {
    return this.musicVolume;
  }

  getSfxVolume(): number {
    return this.sfxVolume;
  }

  mute(): void {
    this.isMuted = true;
    this.isMusicPlaying = false;
  }

  unmute(): void {
    this.isMuted = false;
  }

  isMutedCheck(): boolean {
    return this.isMuted;
  }

  savePreferences(): void {
    const prefs = {
      musicVolume: this.musicVolume,
      sfxVolume: this.sfxVolume,
      isMuted: this.isMuted
    };
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audioPrefs', JSON.stringify(prefs));
    }
  }

  loadPreferences(): void {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('audioPrefs');
      if (stored) {
        const prefs = JSON.parse(stored);
        this.musicVolume = prefs.musicVolume || 0.7;
        this.sfxVolume = prefs.sfxVolume || 0.8;
        this.isMuted = prefs.isMuted || false;
      }
    }
  }

  preloadSounds(): void {
    // Non-blocking preload - return immediately
    setTimeout(() => {
      this.loadSounds();
    }, 0);
  }

  cleanup(): void {
    // Cleanup finished sounds automatically
    this.activeSounds = [];
    this.isMusicPlaying = false;
  }
}