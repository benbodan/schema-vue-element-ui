
class Component {
    setup(props = {}) {
        Object.keys(props).forEach(key => {
            if (props[key] != null) {
                this[key] = props[key];
            }
        });
    }
}

export default Component;