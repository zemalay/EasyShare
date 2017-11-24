class Posting {
    constructor(application) {
        this.postingSchema = application.api.models.posting.Schema

    }

}

module.exports = function () {
    return Posting;
}