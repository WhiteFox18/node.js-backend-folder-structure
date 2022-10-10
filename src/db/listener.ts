import db from "./index";

const startDatabaseListening = () => {
    db.connect({ direct: false })
        .then(sco => {
            sco.client.on("notification", async (data) => {
                try {
                    const result = JSON.parse(data.payload);

                    console.log(`Elastic: table = ${result.table_name}; id = ${result.id}`);

                    await db.elastic.service.execute({
                        table_name: result.table_name,
                        id: result.id,
                        data: result.data,
                        operation: result.operation.toLowerCase(),
                        difference: result.difference
                    });
                } catch (e) {
                    console.log(e);
                }
            });
            return sco.none("LISTEN $1:name", "elastic_notification_channel");
        })
        .catch(error => {
            console.log("Error:", error);
        });

    db.connect({ direct: false })
        .then(sco => {
            sco.client.on("notification", async (data) => {
                try {
                    const result = JSON.parse(data.payload);

                    console.log(`Redis: table = ${result.table_name}; id = ${result.id}`);

                    await db.caching.service.execute({
                        table_name: result.table_name,
                        id: result.id,
                        data: result.data,
                        operation: result.operation.toLowerCase(),
                    });
                } catch (e) {
                    console.log(e);
                }
            });
            return sco.none("LISTEN $1:name", "redis_notification_channel");
        })
        .catch(error => {
            console.log("Error:", error);
        });
};

export default startDatabaseListening;
