<template>
  <div class="hello">
    <h1 id="title">Lekker Speuren</h1>

    <!-- <input id="search" type="text" autofocus> -->
    <input v-model="searchInput" placeholder="placeholder" @change="inputChanged($event)" autofocus />

    <div id="containers">
      <div id="cards">
      </div>

      <div id="detailed" class="empty"></div>
    </div>

    <div id="cards">
    <CardComponent
      v-for="card in filtered"
      :key="card.id"
      :data="card"
    />
  </div>

    <footer>
      <p>Gemaakt door Sheepolution. Bekijk het project op <a
          href="https://github.com/lekkersicko/lekker-speuren">Github</a>.</p>
      <p>Data verzameld en verwerkt door Sheepolution, Braxshinoa, Donnosaurus, CappiSteijns, en LolligeOllie.</p>
    </footer>
  </div>
</template>

<script >
import { ref } from 'vue'
import podcasts from '../../data/podcasts.json'
import streams from '../../data/streams.json'
import videos from '../../data/videos.json'
import CardComponent from './CardComponent.vue'
export default {
  name: 'SearchComponent',
  props: {
    msg: String
  },
  components: {
    CardComponent
  }
}

</script>
<script setup>
// The data object contains all the data from the JSON files
let data = {
  podcasts: [],
  videos: [],
  streams: [],
}

const searchInput = ref('')
const filtered = ref([])

FetchData();
function inputChanged(event){
  Search(searchInput.value)
}
function FetchData() {
  data.podcasts = podcasts
  data.videos = videos
  data.streams = streams
  console.log(data)
}

// eslint-disable-next-line no-unused-vars
function Search(input) {
    console.log( `searching ${input}`)
    // const filtered = []

    // Copy the data object
    const filteredData = {
        podcasts: data.podcasts.slice(),
        videos: data.videos.slice(),
        streams: data.streams.slice(),
    }

    const normalizedInput = NormalizeString(input)

    const words = [];

    // Collect all the words. Words between quotes are treated as one word. 
    let word = '';
    let quote = false;
    let negativeWords = [];
    for (const char of normalizedInput) {
        if (char == ' ') {
            if (quote) {
                word += char;
            } else if (word.length > 0) {
                if (word.startsWith('-')) {
                    negativeWords.push(word.substring(1));
                } else {
                    words.push(word);
                }
                word = '';
            }
        } else if (char == '"') {
            quote = !quote;
            if (!quote) {
                if (word.startsWith('-')) {
                    negativeWords.push(word.substring(1));
                } else {
                    words.push(word);
                }
                word = '';
            }
        } else {
            word += char;
        }
    }

    if (word.startsWith('-')) {
        negativeWords.push(word.substring(1));
    } else {
        words.push(word);
    }

    for (const negativeWord of negativeWords) {
        ApplyFilter(filteredData, negativeWord, true)
    }

    for (const word of words) {
        ApplyFilter(filteredData, word)
    }

    for (const podcast of filteredData.podcasts) {
        podcast.type = 'podcast';
        filtered.value.push(podcast)
    }

    for (const video of filteredData.videos) {
        video.type = 'video';
        filtered.value.push(video)
    }
    for (const stream of filteredData.streams) {
        stream.type = 'stream';
        filtered.value.push(stream)
    }

    // Sort filtered by date, newest first. .date is a string in the format "DD/MM/YYYY"
    filtered.value.sort((a, b) => {
        const aDate = a.date.split('/').reverse().join('');
        const bDate = b.date.split('/').reverse().join('');
        return bDate.localeCompare(aDate);
    })

    console.log(filtered)

    // Render filtered data
    // RenderCards(filtered)

    
}
function NormalizeString(s) {
    return s == null ? '' : s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

function ApplyFilter(data, target, negative) {
    // Podcasts
    negative = !!negative;

    data.podcasts = data.podcasts.filter(podcast => {
        return (NormalizeString(podcast.title).includes(target) ||
            NormalizeString(podcast.description).includes(target)) != negative;
    });

    // Videos
    data.videos = data.videos.filter(video => {
        return (NormalizeString(video.title).includes(target) ||
            NormalizeString(video.description).includes(target) ||
            (Array.isArray(video.game) ? video.game.some(game => {
                return NormalizeString(game).includes(target)
            }) : NormalizeString(video.game).includes(target))) != negative;
    });

    // Streams
    data.streams = data.streams.filter(stream => {
        return (NormalizeString(stream.description).includes(target) ||
            stream.all_titles?.some(title => {
                return NormalizeString(title).includes(target)
            }) ||
            stream.games?.some(game => {
                return NormalizeString(game.title).includes(target)
            }) ||
            stream.tags?.some(tag => {
                return NormalizeString(tag).includes(target)
            })) != negative;
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
