/* eslint-disable */

class Event  {
    constructor(topic, payload = {}) {
        this.topic = topic;
        this.payload = payload;
    }

    json() {
        return {
            topic: this.topic,
            payload: this.payload
        }
    }
}

export default Event;