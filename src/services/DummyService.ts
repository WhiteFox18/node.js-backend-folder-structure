import { DatabaseClient, ServiceProps } from "../types";
import DummyModel from "./models/DummyModel";
import { ExtendedDatabase } from "../db";

export default class DummyService {
  private db: ExtendedDatabase = null;
  private pgp: DatabaseClient = null;

  constructor(props: ServiceProps) {
    this.db = props.db;
    this.pgp = props.pgp;
  }

  dummyFunc = async () => {
    try {
      return this.db.oneOrNone(
        await DummyModel.dummyFunc()
      )
    } catch (e) {
      throw e;
    }
  };
}