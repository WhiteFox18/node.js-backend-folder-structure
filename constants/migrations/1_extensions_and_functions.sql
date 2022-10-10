create or replace function row_diff(row1 anyelement, row2 anyelement)
    returns text[]
    language plpgsql
as
$$
BEGIN
    RETURN (SELECT array_agg(cast(column_name as text))
            FROM (SELECT json_object_keys(row_to_json(row1)) as column_name,
                         row_to_json(row1) ->>
                         json_object_keys(row_to_json(row1)) as value

                  EXCEPT

                  SELECT json_object_keys(row_to_json(row2)) as column_name,
                         row_to_json(row2) ->>
                         json_object_keys(row_to_json(row2)) as value) data);
end;
$$;