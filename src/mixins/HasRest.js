import axios from 'axios'
export default {
    data() {
        return {
            loading: false,
            render: 1
        }
    },
    methods: {
        get() {
            let repo = this.props.repository.props

            // Repository missing
            if (!repo) {
                return;
            }

            this.loading = true
            let url = repo.get
            url += this.generateParams(this.queryParams())

            axios.get(url).then(response => {
                this.afterGet(response)
                this.render++
                this.loading = false
            })
        },
        show() {
            let repo = this.props.repository.props

            // Repository missing
            if (!repo) {
                return;
            }

            this.loading = true
            let url = repo.show
            url += this.generateParams(this.queryParams())

            axios.get(url).then(response => {
                this.afterShow(response.data)
                this.render++
                this.loading = false
            })
        },
        post(){
            let repo = this.props.repository.props
            let url = repo.create
            url += this.generateParams(this.queryParams())
            axios.post(url, this.body()).then(response => {
                this.afterCreate(response.data)
                this.render++
                this.loading = false
            })
        },
        delete(){
            let repo = this.props.repository.props
            let url = repo.delete
            url += this.generateParams(this.queryParams())
            axios.delete(url, this.body()).then(response => {
                this.afterDelete(response.data)
                this.render++
                this.loading = false
            })
        },
        patch(){
            let repo = this.props.repository.props
            let url = repo.update
            url += this.generateParams(this.queryParams())
            axios.patch(url, this.body()).then(response => {
                this.afterUpdate(response.data)
                this.render++
                this.loading = false
            })
        },
        put(){
            let repo = this.props.repository.props
            let url = repo.update
            url += this.generateParams(this.queryParams())
            axios.put(url, this.body()).then(response => {
                this.afterUpdate(response.data)
                this.render++
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