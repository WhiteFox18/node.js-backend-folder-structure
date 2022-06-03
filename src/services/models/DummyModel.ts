import { pgp } from "../../db";

const DummyModel = {
  dummyFunc: async () => {
    try {
      return pgp.as.format(`
          SELECT now();
      `);
    } catch (e) {
      throw e;
    }
  },
};

export default DummyModel;