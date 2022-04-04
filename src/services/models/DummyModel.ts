import db from "../../db";

const DummyModel = {
  dummyFunc: async () => {
    try {
      return await db.one(`
                SELECT now();
            `);
    } catch (e) {
      throw e;
    }
  },
};

export default DummyModel;