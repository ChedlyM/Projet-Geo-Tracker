CREATE TABLE activity (
    id integer NOT NULL,
    name character varying,
    distance integer,
    date date,
    comments character varying,
    gpxData character varying
);


ALTER TABLE public.activity OWNER TO postgres;

ALTER TABLE public.activity ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.activity_id_seq
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.user (
    id integer NOT NULL,
    name character varying,
    password character NOT NULL,
    role character NOT NULL
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

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);