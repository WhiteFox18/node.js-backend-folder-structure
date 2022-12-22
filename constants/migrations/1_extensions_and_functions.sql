CREATE EXTENSION IF NOT EXISTS pg_trgm;

create or replace function not_nullable_word_similarity(text1 text, text2 text)
    returns real
    language plpgsql
as
$$
BEGIN
    RETURN coalesce(word_similarity(text1::text, text2::text), 0);
end;
$$;


create or replace function array_diff(array1 bigint[], array2 bigint[])
    returns int[]
    language plpgsql
as
$$
BEGIN
    RETURN (
        SELECT array
                   (SELECT unnest(array1)
                    EXCEPT
                    SELECT unnest(array2))
    );
end;
$$;


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