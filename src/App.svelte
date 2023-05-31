<script lang="ts">
  import { onDestroy } from 'svelte';
  import { reducible } from './store';

  const initialWords: string[] = ['a', 'b', 'c', 'd', 'e'];
  let score: number = 0;
  let seconds = 60;
  const [words, dispatch] = reducible(initialWords, reducer);

  interface Action {
    type: string;
    payload: string;
  }

  function reducer(words: string[], action: Action) {
    switch (action.type) {
      case 'PRESS_KEY':
        const wordIndex: number = words.indexOf(action.payload);
        if (wordIndex !== -1) {
          score++;
          words.splice(wordIndex, 1, getRandomCharacter());
        }
        return words;
      default:
        return words;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      default:
        dispatch({ type: 'PRESS_KEY', payload: e.key });
        break;
    }
  }

  function getRandomCharacter(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  function countdown() {
    if (seconds > 0) {
      seconds--;
    } else {
      alert('time is up!');
      clearInterval(countdownInterval);
      return;
    }
  }

  const countdownInterval = setInterval(countdown, 1000);

  window.addEventListener('keydown', handleKeyDown);

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    clearInterval(countdownInterval);
  });
</script>

<main>
  <div class="header">
    <div class="time">{seconds}</div>
    <div class="score">score: {score}</div>
  </div>
  <div class="wordWrapper">
    {#each $words as word}
      <div class="word">{word.toUpperCase()}</div>
    {/each}
  </div>
</main>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: aquamarine;
  }

  .time {
    font-size: 50px;
  }

  .score {
    font-size: 45px;
  }

  .wordWrapper {
    width: 80vw;
    height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .word {
    font-size: 90px;
  }
</style>
