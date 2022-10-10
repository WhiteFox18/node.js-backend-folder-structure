CREATE OR REPLACE FUNCTION notify_elastic_on_table_change()
    RETURNS trigger
    LANGUAGE plpgsql
AS
$function$
DECLARE
    _id            varchar;
    _json          jsonb;
    _row           jsonb;
    _new           jsonb;
    _old           jsonb;
    _difference    text[];
BEGIN
    _row = coalesce(row_to_json(NEW), row_to_json(OLD));
    _new = coalesce(row_to_json(NEW), row_to_json(OLD));
    _old = row_to_json(OLD);

    --Try to read field values from the row
    --By using json functions we can do this in a "late binding"-fashion without
    --getting errors for non existing fields
    _id = _row ->> 'id';

    IF _old IS NOT NULL THEN
        _difference = row_diff(NEW, OLD);
    END IF;

    _json = jsonb_build_object(
            'table_name', TG_TABLE_NAME,
            'operation', TG_OP,
            'id', _id,
            'data', _row,
            'difference', _difference
        );

    --Strip null values from the json to get rid of fields that does not exist in this particular table
    _json = jsonb_strip_nulls(_json);

    --Send the message as a stringified json
    PERFORM pg_notify('elastic_notification_channel', _json::varchar);

    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION notify_redis_on_table_change()
    RETURNS trigger
    LANGUAGE plpgsql
AS
$function$
DECLARE
    _id            varchar;
    _json          jsonb;
    _row           jsonb;
    _new           jsonb;
    _old           jsonb;
    _difference    text[];
BEGIN
    _row = coalesce(row_to_json(NEW), row_to_json(OLD));
    _new = coalesce(row_to_json(NEW), row_to_json(OLD));
    _old = row_to_json(OLD);

    --Try to read field values from the row
    --By using json functions we can do this in a "late binding"-fashion without
    --getting errors for non existing fields
    _id = _row ->> 'id';

    _difference = null;

    IF _old IS NOT NULL THEN
        _difference = row_diff(NEW, OLD);
    END IF;

    _json = jsonb_build_object(
            'table_name', TG_TABLE_NAME,
            'operation', TG_OP,
            'id', _id,
            'data', _row,
            'difference', _difference
        );

    --Strip null values from the json to get rid of fields that does not exist in this particular table
    _json = jsonb_strip_nulls(_json);

    --Send the message as a stringified json
    PERFORM pg_notify('redis_notification_channel', _json::varchar);

    RETURN NULL;
END;
$function$;
