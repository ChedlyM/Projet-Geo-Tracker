CREATE TABLE public.user (
    id integer NOT NULL,
    name character varying,
    password character varying NOT NULL,
    role character varying NOT NULL
);


ALTER TABLE public.user OWNER TO postgres;

ALTER TABLE public.user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


CREATE TABLE gpxdata (
    id integer NOT NULL,
    lat double precision,
    long double precision,
    "time" character varying,
    "idUser" integer
);
ALTER TABLE public.gpxdata OWNER TO postgres;
ALTER TABLE public.gpxdata ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.gpxdata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
ALTER TABLE ONLY public.gpxdata
    ADD CONSTRAINT gpxdata_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.gpxdata
    ADD CONSTRAINT "FK_gpxdata_user" FOREIGN KEY ("idUser") REFERENCES public."user"(id) NOT VALID;



