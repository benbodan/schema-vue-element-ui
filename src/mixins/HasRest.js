import axios from 'axios'
export default {
    data() {
        return {
            loading: false,
            response: {},
        }
    },
    methods: {
        initRest(repo) {
            if (repo.props) {
                this.get(repo.props);
            }
        },
        get(repo) {
            this.loading = true
            let url = repo.get
            url += this.generateParams(this.queryParams())

            axios.get(url).then(response => {
                this.afterGet(response)
                this.loading = false
            })
        },
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
}