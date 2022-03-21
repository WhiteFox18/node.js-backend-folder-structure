import db, {pg} from "../db";
import DummyService from "./DummyService";

export const Dummy = new DummyService({db, pg})