const redis = require("redis");
const client = redis.createClient();

client.on("connect", () => console.log("Connecté au client Redis"));

client.on("error", (err) => console.error("Erreur du client Redis:", err));

(async () => {
    await client.connect();
})();

exports.getCache = async (key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(
            `Erreur lors de la récupération du cache pour la clé "${key}":`,
            err
        );
        throw err;
    }
};

exports.setCache = async (key, value, options) => {
    try {
        const ttl = options && options.EX ? options.EX : 5;
        await client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (err) {
        console.error(
            `Erreur lors de la mise en cache pour la clé "${key}":`,
            err
        );
        throw err;
    }
};

exports.delCache = async (key) => {
    try {
        await client.del(key);
    } catch (err) {
        console.error(
            `Erreur lors de la suppression du cache pour la clé "${key}":`,
            err
        );
        throw err;
    }
};
