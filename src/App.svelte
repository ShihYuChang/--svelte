<script lang="ts">
  import { onDestroy } from 'svelte';
  import { reducible } from './store';

  const initialWords: string[] = Array(5).fill('');
  for (let i = 0; i < initialWords.length; i++) {
    initialWords[i] = getRandomCharacter();
  }

  let score: number = 0;
  let seconds: number = 60;
  const [words, dispatch] = reducible(initialWords, reducer);

  interface Action {
    type: string;
    payload: string;
  }

  function reducer(words: string[], action: Action) {
    switch (action.type) {
      case 'PRESS_KEY':
        const wordIndex: number = words.indexOf(action.payload);
        if (wordIndex !== -1 && seconds > 0) {
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

  function countdown(interval: number) {
    if (seconds > 0) {
      seconds--;
    } else {
      alert(`time is up! Your total score is ${score}`);
      clearInterval(interval);
      return;
    }
  }

  function restart() {
    clearInterval(countdownInterval);
    seconds = 60;
    score = 0;
    const newCountdownInterval = setInterval(
      () => countdown(newCountdownInterval),
      1000
    );
  }

  const countdownInterval = setInterval(
    () => countdown(countdownInterval),
    1000
  );

  window.addEventListener('keydown', handleKeyDown);

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    clearInterval(countdownInterval);
  });
</script>

<main>
  <div class="header">
    <button class="restartBtn" on:click={restart}>Restart</button>
    <div class="time">{seconds}</div>
    <div class="score">score: {score}</div>
  </div>
  <div class="wordWrapper">
    {#if seconds > 0}
      {#each $words as word}
        <div class="word">{word.toUpperCase()}</div>
      {/each}
    {/if}
    {#if seconds === 0}
      <div class="word">Your Score: {score}</div>
    {/if}
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

  .restartBtn {
    border-radius: 10px;
    background-color: #a4a4a3;
    outline: none;
    border: 0;
    cursor: pointer;

    &:hover {
      background-color: rgb(0, 13, 255);
    }
  }
</style>
