const mongoose = require('mongoose')
const Schema = mongoose.Schema

const initDataSchema = new mongoose.Schema({
    language: {
      type: String,
      required: true
    },
    pages: {
        homePage: {
            path: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            favIcon: String,
            modules: {
                Offers: {
                    offer: {
                        type: Map,
                        of: [String],
                        required: true
                    }
                },
                ContactAndOpeningHours: {
                    contact: {
                    address: {
                        type: [{
                            cs: String,
                            sk: String,
                            pl: String,
                            ua: String,
                            ru: String,
                            en: String
                        }],
                        required: true
                    },
                    email: {
                        type: [{
                            cs: String,
                            sk: String,
                            pl: String,
                            ua: String,
                            ru: String,
                            en: String
                        }],
                        required: true
                    },
                    phone: {
                        type: [{
                            cs: [String],
                            sk: [String],
                            pl: [String],
                            ua: [String],
                            ru: [String],
                            en: [String]
                        }],
                        required: true
                    },
                    id: {
                        ico: String,
                        dic: String
                    }
                    },
                    openingHours: {
                    days: {
                        sunday: [String, String],
                        monday: [String, String],
                        tuesday: [String, String],
                        wednesday: [String, String],
                        thursday: [String, String],
                        friday: [String, String],
                        saturday: [String, String]
                    },
                    message: {
                        cs: String,
                        sk: String,
                        pl: String,
                        ua: String,
                        ru: String,
                        en: String
                    }
                    }
                },
                Partners: {
                    partners: {
                    type: Map,
                    of: {
                        text: {
                            cs: String
                            },
                            link0: String
                    },
                    required: true
                    }
                },
                Brands: {
                    brands: {
                        type: Map,
                        of: String,
                        required: true
                    }
                }
            }
        }
    }
});

const IntDataModel = mongoose.model ('InitData', initDataSchema);

module.exports = IntDataModel;