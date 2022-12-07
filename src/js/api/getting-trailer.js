import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { API_KEY } from './api-key';



export default class TrailerApiService {
    constructor() { 
        this.filmID = 0;
    }
     
    async showTrailer() { 
        Notify.init({
            position: 'center-top',
        });

        try {
            const data = await this.fetchTrailer();

            if (data.length === 0 || data === undefined) {
                console.log(data.length);
                Notify.failure('Sorry, trailer not found.');
                return;
            }

            let key = "";
            data.forEach(element => {
                if (element.type === "Trailer") {
                    if (element.name.includes("Official")) {
                        key = element.key;
                        return; 
                    }
                }
            });

            if (!key) {
               key = data[0].key; 
            }

            const instance = basicLightbox.create(`
                <div>
                    <iframe class="youtube-modal" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>
                </div>
            `);

            instance.show();
        } catch(error) { 
            Notify.failure('Sorry, trailer not found.');
        }
    }

    async fetchTrailer() {
        const URL = `https://api.themoviedb.org/3/movie/${this.filmID}/videos?api_key=${API_KEY}&language=en-US`;
        const response = await axios.get(URL);

        return response.data.results;
    }
}