import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { API_KEY } from './api-key';

export default class TrailerApiService {
    constructor() { 
        this.filmID = 0;
    }
     
    async showTrailer() { 
        try {
            const data = await this.fetchTrailer();

            if (data.length === 0 || data === undefined) {
                alert('Sorry, trailer not found.');
                return;
            }

            let key = "";
            data.forEach(element => {
                if (element.type === "Trailer") {
                    if (element.name.includes("Official")) {
                        key = element.key;
                        return; 
                    } else { 
                        key = element.key;
                        return ;
                    }
                }
            });
            console.log(key);

            const instance = basicLightbox.create(`
                <div class="youtube-modal">
                    <iframe src="https://www.youtube.com/embed/${key}" width="640" height="480" frameborder="0" allowfullscreen></iframe>
                </div>
            `);

            instance.show();
        } catch { 

        }
    }

    async fetchTrailer() {
        const URL = `https://api.themoviedb.org/3/movie/${this.filmID}/videos?api_key=${API_KEY}&language=en-US`;
        const response = await axios.get(URL);

        return response.data.results;
    }
}