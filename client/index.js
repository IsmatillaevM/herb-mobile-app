const { createApp } = Vue


const App = createApp({
  data() {
    return {
      searchInput: '', 
      randomHerbs: [],
      answerQuery: [],
      msg_query: '',
      currentSlide: 'slideOne',
    }
  },

  methods: {
    randomSearch(searchQuery) {
       
        request('/search', 'POST', {name: searchQuery})
          .then(data => {
            this.answerQuery = data; // Assume data is an array
          })
          .catch(error => {
            console.error('Error searching for herbs:', error);
          });
      
    },
    search() {
      this.answerQuery = [];
      if(this.searchInput !== '') {
        request('/search', 'POST', {name: this.searchInput})
        .then(data => {
          this.answerQuery = data; // Assume data is an array
        })
        .catch(error => {
          console.error('Error searching for herbs:', error);
        });
      }
      else{
       alert("So'rovni kiriting")
      }
    },
    answering(){
      this.answerQuery = [];
      if(this.msg_query !== ''){
        request('/answering', 'POST', {name: this.msg_query})
        .then(data => {
          this.answerQuery = data; 
          console.log(data);
        })
        .catch(error => {
          console.error('Error searching for herbs:', error);
        });
      }
      else{
        alert("So'rovni kiriting")
      }
    },

    getrandomHerbs() {
      request('/random', 'POST')
        .then(data => {
          this.randomHerbs = data; // Assume data is an array
        })
        .catch(error => {
          console.error('Error fetching random herbs:', error);
        });
    },
    showSlideOne() {
      this.answerQuery = [];
      this.currentSlide = 'slideOne';

    },

  
    showSlideTwo() {
      this.answerQuery = [];
      this.currentSlide = 'slideTwo';
    }
  },

  mounted() {
    this.getrandomHerbs();
  }
});




App.mount('#vueapp')





async function request(url, method, data) {

  try {
    const headers = {}
    let body
    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch('http://127.0.0.1:8000' + url, {
      method,
      headers,
      body
    })

    return await response.json()

  }
  catch (e) {
    console.warn('Error:', e.message)
  }
}






