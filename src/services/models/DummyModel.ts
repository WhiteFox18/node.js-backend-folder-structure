import { pgp } from "../../db";

const DummyModel = {
    dummyFunc: async () => {
        return pgp.as.format(`
            SELECT now();
        `);
    },
};

export default DummyModel;