<script lang="ts">
  import { reducible } from './store';
    
interface Action {
  type: string,
  payload: number
};

  function reducer(words: number, action: Action){
    switch(action.type){  
      case 'increment':
        return words + action.payload;
      default:
        return words
    }
  };

  const [words, dispatch] = reducible(0, reducer);

  function handleKeyDown(e: KeyboardEvent){
    switch(e.key){
      case 'a':
        dispatch({type: 'increment', payload: 1})
      default:
        break;
    }
  }


  window.addEventListener('keydown', handleKeyDown)
  // const words: string[] = ['A', 'B', 'C', 'D', 'E'];

  </script>

<main>
  <div class="wrapper">
    <div class="word">{$words}</div>
  </div>
  <button on:click={()=> dispatch({type: 'increment', payload: 5})}>Add</button>
  <!-- <div class="wrapper">
    {#each words as word}
      <div class="word">{word}</div>
    {/each}
  </div> -->
</main>

<style>
.wrapper{
  width: 80vw;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.word{
  font-size: 90px;
}
</style>
