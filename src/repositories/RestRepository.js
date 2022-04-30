import axios from "axios";

class RestRepository {
    constructor(options = {}){
        this.options = options;
    }

    get(queryParams) {
        this.loading = true
        let url = this.options.get
        url += this.generateParams(queryParams)

        axios.get(url).then(response => {
            this.getCallback(response.data)
            this.render++
            this.loading = false
        })
    }

    afterGet(getCallback){
        this.getCallback = getCallback
    }

    generateParams(filters) {

        let hasKeys = Object.keys(filters).length;
        if (!hasKeys) {
            return ""
        }

        let params = []
        for (let k in filters) {
            if (typeof filters[k] !== undefined) {
                params.push(k + "=" + encodeURIComponent(filters[k]))
            }
        }

        return "?" + params.join('&')
    }
}

export default RestRepository;