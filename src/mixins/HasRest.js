import axios from 'axios'
export default {
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        get() {
            let repo = this.props.repository.props

            // Repository missing
            if(!repo) {
                return;
            }

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