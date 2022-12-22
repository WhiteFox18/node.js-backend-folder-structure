import elasticClient from "./index"
import { ElasticIndexes } from "../../types"

export const deleteElasticIndexes = async () => {
    if (await elasticClient.indices.exists({ index: ElasticIndexes.person }))
        await elasticClient.indices.delete({
            index: ElasticIndexes.person,
        })
}

export const updateElasticIndexesMappings = async () => {
    if (await elasticClient.indices.exists({ index: ElasticIndexes.person })) {
        await elasticClient.indices.close({
            index: ElasticIndexes.person,
        })

        await elasticClient.indices.putSettings({
            index: ElasticIndexes.person,
            settings: {},
        })

        await elasticClient.indices.putMapping({
            index: ElasticIndexes.person,
            properties: {},
        })

        await elasticClient.indices.open({
            index: ElasticIndexes.person,
        })
    }
}

export const createElasticIndexes = async () => {
    if (!await elasticClient.indices.exists({ index: ElasticIndexes.person })) {
        await elasticClient.indices.create({
            index: ElasticIndexes.person,
            settings: {},
            mappings: {},
        })
    }
}
