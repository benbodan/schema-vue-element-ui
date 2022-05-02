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
            this.loading = false
        })
    }

    show(queryParams) {
        this.loading = true
        let url = this.options.show
        url += this.generateParams(queryParams)
        axios.get(url).then(response => {
            this.getCallback(response.data)
            this.loading = false
        })
    }

    delete(body, queryParams) {
        this.loading = true
        let url = this.options.delete
        url += this.generateParams(queryParams)

        axios.delete(url, body).then(response => {
            this.getCallback(response.data)
            this.loading = false
        })
    }

    post(body, queryParams) {
        this.loading = true
        let url = this.options.create
        url += this.generateParams(queryParams)

        axios.post(url, body).then(response => {
            this.getCallback(response.data)
            this.loading = false
        })
    }

    put(body, queryParams) {
        this.loading = true
        let url = this.options.update
        url += this.generateParams(queryParams)

        axios.put(url, body).then(response => {
            this.getCallback(response.data)
            this.loading = false
        })
    }

    patch(body, queryParams) {
        this.loading = true
        let url = this.options.update
        url += this.generateParams(queryParams)

        axios.patch(url, body).then(response => {
            this.getCallback(response.data)
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