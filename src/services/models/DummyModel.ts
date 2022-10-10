import { pgp } from "../../db";

const DummyModel = {
    dummyFunc: (data: { search: string }) => {
        return pgp.as.format(`
            SELECT now();
        `);
    },
};

export default DummyModel;