-- DROP FUNCTION public.insert_into_accounts();

CREATE OR REPLACE FUNCTION public.insert_into_accounts()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        -- Logika jika ada data baru masuk
        INSERT INTO public.accounts (id, fullname, email, "role", username)
        VALUES (NEW.id, NEW.fullname, NEW.email, NEW."role", NEW.username);
        
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Logika jika ada data yang diupdate
        UPDATE public.accounts
        SET fullname = NEW.fullname,
            email = NEW.email,
            "role" = NEW."role",
            username = NEW.username
        WHERE id = OLD.id; -- Mencocokkan berdasarkan ID lama
    END IF;
    
    RETURN NEW;
END;
$function$
;