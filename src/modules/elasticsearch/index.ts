import { Client } from "@elastic/elasticsearch"
import config from "../../config"

const elasticClient = new Client({
    auth: {
        username: config.elastic.username,
        password: config.elastic.password,
    },
    node: config.elastic.node_url,
})

export default elasticClient
