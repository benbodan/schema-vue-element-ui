class Repository {
    setup(props = {}) {
        Object.keys(props).forEach(key => {
            if (props[key] != null) {
                this[key] = props[key];
            }
        });
    }
}

export default Repository;