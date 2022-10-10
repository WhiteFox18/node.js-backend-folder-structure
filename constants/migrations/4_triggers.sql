CREATE OR REPLACE TRIGGER on_person_change_notify_elastic
    AFTER INSERT OR UPDATE OR DELETE
    ON person
    FOR EACH ROW
EXECUTE PROCEDURE notify_elastic_on_table_change();