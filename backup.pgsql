--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appunti; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.appunti (
    ida integer NOT NULL,
    scuola character varying(10) NOT NULL,
    studente integer NOT NULL,
    materia character varying(100) NOT NULL,
    anno integer NOT NULL,
    argomento character varying(100) NOT NULL,
    professore character varying(40) NOT NULL,
    datainserimento date NOT NULL,
    foto character varying(20) NOT NULL
);


ALTER TABLE public.appunti OWNER TO "Classmate";

--
-- Name: appunti_ida_seq; Type: SEQUENCE; Schema: public; Owner: Classmate
--

ALTER TABLE public.appunti ALTER COLUMN ida ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.appunti_ida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: evento; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.evento (
    ide integer NOT NULL,
    scuola character varying(10) NOT NULL,
    tipo bit(1) DEFAULT '0'::"bit" NOT NULL,
    testo character varying(100) NOT NULL,
    foto character varying(25) NOT NULL,
    studente integer NOT NULL,
    data date DEFAULT '2024-05-29'::date NOT NULL,
    titolo character varying(20) NOT NULL,
    official bit(1) DEFAULT '0'::"bit" NOT NULL
);


ALTER TABLE public.evento OWNER TO "Classmate";

--
-- Name: evento_ide_seq; Type: SEQUENCE; Schema: public; Owner: Classmate
--

ALTER TABLE public.evento ALTER COLUMN ide ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.evento_ide_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: materia; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.materia (
    nome character varying(100) NOT NULL,
    scuola character varying(10) NOT NULL,
    idm integer NOT NULL
);


ALTER TABLE public.materia OWNER TO "Classmate";

--
-- Name: materia_idm_seq; Type: SEQUENCE; Schema: public; Owner: Classmate
--

CREATE SEQUENCE public.materia_idm_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materia_idm_seq OWNER TO "Classmate";

--
-- Name: materia_idm_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Classmate
--

ALTER SEQUENCE public.materia_idm_seq OWNED BY public.materia.idm;


--
-- Name: professore; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.professore (
    scuola character varying(10) NOT NULL,
    nominativo character varying(40) NOT NULL,
    idp integer NOT NULL
);


ALTER TABLE public.professore OWNER TO "Classmate";

--
-- Name: professore_idp_seq; Type: SEQUENCE; Schema: public; Owner: Classmate
--

CREATE SEQUENCE public.professore_idp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.professore_idp_seq OWNER TO "Classmate";

--
-- Name: professore_idp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Classmate
--

ALTER SEQUENCE public.professore_idp_seq OWNED BY public.professore.idp;


--
-- Name: scuola; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.scuola (
    codice character varying(10) NOT NULL,
    nome character varying(15) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(50) NOT NULL,
    indirizzo character varying(100) NOT NULL,
    descrizione character varying(300) NOT NULL,
    foto character varying(20) NOT NULL,
    numerostudenti integer NOT NULL,
    numeroappunticaricati integer NOT NULL,
    anni integer NOT NULL
);


ALTER TABLE public.scuola OWNER TO "Classmate";

--
-- Name: studente; Type: TABLE; Schema: public; Owner: Classmate
--

CREATE TABLE public.studente (
    ids integer NOT NULL,
    scuola character varying(10) NOT NULL,
    password character varying(50) NOT NULL,
    nome character varying(20) NOT NULL,
    cognome character varying(20) NOT NULL,
    cellulare character varying(15),
    anno integer NOT NULL,
    fotoprofilo character varying(35) NOT NULL,
    appunticaricati integer NOT NULL,
    classe character varying(10) NOT NULL,
    biografia character varying(300) NOT NULL,
    coordinatore bit(1) NOT NULL,
    email character varying(50) NOT NULL,
    approvato bit(1) NOT NULL
);


ALTER TABLE public.studente OWNER TO "Classmate";

--
-- Name: studente_ids_seq; Type: SEQUENCE; Schema: public; Owner: Classmate
--

ALTER TABLE public.studente ALTER COLUMN ids ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.studente_ids_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: materia idm; Type: DEFAULT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.materia ALTER COLUMN idm SET DEFAULT nextval('public.materia_idm_seq'::regclass);


--
-- Name: professore idp; Type: DEFAULT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.professore ALTER COLUMN idp SET DEFAULT nextval('public.professore_idp_seq'::regclass);


--
-- Data for Name: appunti; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.appunti (ida, scuola, studente, materia, anno, argomento, professore, datainserimento, foto) FROM stdin;
16	lmnt	2	Matematica	2	equazioni	fabio bianchi	2024-04-28	appunti_16.jpg
12	lmnt	2	latino	5	declinazioni	fabio bianchi	2024-04-12	appunti_12.jpg
13	issp	2	informatica	3	C#	toni greco	2024-04-12	appunti_13.png
10	issp	1	informatica	5	blazor	toni greco	2024-04-12	appunti_10.png
11	issp	2	italiano	4	leopardi	brunella tombetti	2024-04-12	appunti_11.png
55	issp	1	italiano	1	Pascoli	brunella tombetti	2024-05-24	appunti_55.pdf
15	issp	1	sistemi e reti	3	Server	francesco tappi	2024-04-12	appunti_15.jpg
14	issp	1	informatica	3	HTML	francesco tappi	2024-04-12	appunti_14.png
\.


--
-- Data for Name: evento; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.evento (ide, scuola, tipo, testo, foto, studente, data, titolo, official) FROM stdin;
14	issp	0	prova	14_event_pic.jpeg	1	2024-05-22	Titolo di prova	0
8	issp	0	festa gatti	8_event_pic.jpg	1	2024-05-08	GattoParty	1
\.


--
-- Data for Name: materia; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.materia (nome, scuola, idm) FROM stdin;
informatica	issp	1
italiano	issp	2
sistemi e reti	issp	3
latino	lmnt	4
matematica	lmnt	5
gestione progetto e organizzazione di impresa	issp	6
italiano	lmnt	7
\.


--
-- Data for Name: professore; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.professore (scuola, nominativo, idp) FROM stdin;
issp	toni greco	1
issp	brunella tombetti	2
lmnt	fabio bianchi	3
issp	francesco tappi	4
issp	carlo biondi	5
lmnt	sara silli	6
\.


--
-- Data for Name: scuola; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.scuola (codice, nome, email, password, indirizzo, descrizione, foto, numerostudenti, numeroappunticaricati, anni) FROM stdin;
issp	pascal	pascal@gmail.com	psswd123	pzz macrelli 100	itt blaise pascal descrizione	foto pascal	900	2	5
lmnt	monti	monti@gmail.com	psswd9876	via cubo 1	liceo monti descrizione	foto monti	600	1	5
\.


--
-- Data for Name: studente; Type: TABLE DATA; Schema: public; Owner: Classmate
--

COPY public.studente (ids, scuola, password, nome, cognome, cellulare, anno, fotoprofilo, appunticaricati, classe, biografia, coordinatore, email, approvato) FROM stdin;
2	lmnt	prova	Mario	Rossi	\N	4	2_profile_pic.jpg	1	4a	Ecco la sua biografia	0	mariorossi10@gmail.com	1
4	issp	lalalala	Mattia	Pasqual	\N	3	default_profile_pic.png	0	3A	Hey there! I m using Classmate!	0	matti10ciao@gmail.com	0
7	issp	psswd123	ITT	Blaise Pascal	\N	5	default_school_profile_pic.jpg	0	 	itt blaise pascal descrizione	1	pascal@gmail.com	1
8	lmnt	psswd9876	Liceo	Monti	\N	5	default_school_profile_pic.jpg	0	 	liceo monti descrizione	1	monti@gmail.com	1
1	issp	prova	Giuliano	Manzi	+393349892165	5	1_profile_pic.jpeg	10	5I	bio di provina	1	giuli05man@gmail.com	1
\.


--
-- Name: appunti_ida_seq; Type: SEQUENCE SET; Schema: public; Owner: Classmate
--

SELECT pg_catalog.setval('public.appunti_ida_seq', 55, true);


--
-- Name: evento_ide_seq; Type: SEQUENCE SET; Schema: public; Owner: Classmate
--

SELECT pg_catalog.setval('public.evento_ide_seq', 15, true);


--
-- Name: materia_idm_seq; Type: SEQUENCE SET; Schema: public; Owner: Classmate
--

SELECT pg_catalog.setval('public.materia_idm_seq', 9, true);


--
-- Name: professore_idp_seq; Type: SEQUENCE SET; Schema: public; Owner: Classmate
--

SELECT pg_catalog.setval('public.professore_idp_seq', 11, true);


--
-- Name: studente_ids_seq; Type: SEQUENCE SET; Schema: public; Owner: Classmate
--

SELECT pg_catalog.setval('public.studente_ids_seq', 9, true);


--
-- Name: scuola Scuola_pkey; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.scuola
    ADD CONSTRAINT "Scuola_pkey" PRIMARY KEY (codice);


--
-- Name: appunti appunti_pkey; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.appunti
    ADD CONSTRAINT appunti_pkey PRIMARY KEY (ida);


--
-- Name: evento evento_pkey; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (ide);


--
-- Name: professore id; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.professore
    ADD CONSTRAINT id PRIMARY KEY (idp);


--
-- Name: materia materia_pkey; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.materia
    ADD CONSTRAINT materia_pkey PRIMARY KEY (idm);


--
-- Name: studente studente_pkey; Type: CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.studente
    ADD CONSTRAINT studente_pkey PRIMARY KEY (ids);


--
-- Name: materia FK_1f14296289b5e7caf671e86e060; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.materia
    ADD CONSTRAINT "FK_1f14296289b5e7caf671e86e060" FOREIGN KEY (scuola) REFERENCES public.scuola(codice);


--
-- Name: professore FK_554fc7d1c607d88f3d1469e97f5; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.professore
    ADD CONSTRAINT "FK_554fc7d1c607d88f3d1469e97f5" FOREIGN KEY (scuola) REFERENCES public.scuola(codice);


--
-- Name: appunti FK_72db426335e79189961353c68a3; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.appunti
    ADD CONSTRAINT "FK_72db426335e79189961353c68a3" FOREIGN KEY (scuola) REFERENCES public.scuola(codice);


--
-- Name: evento FK_94a641e3ba4ce16cf498d91ef1c; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT "FK_94a641e3ba4ce16cf498d91ef1c" FOREIGN KEY (studente) REFERENCES public.studente(ids);


--
-- Name: appunti FK_c056e5c65497324e2a390cbbe41; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.appunti
    ADD CONSTRAINT "FK_c056e5c65497324e2a390cbbe41" FOREIGN KEY (studente) REFERENCES public.studente(ids);


--
-- Name: studente FK_eca8405b0facf87284d024c91a6; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.studente
    ADD CONSTRAINT "FK_eca8405b0facf87284d024c91a6" FOREIGN KEY (scuola) REFERENCES public.scuola(codice);


--
-- Name: evento FK_f9d48c9b97c5e54202f26c8dbc6; Type: FK CONSTRAINT; Schema: public; Owner: Classmate
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT "FK_f9d48c9b97c5e54202f26c8dbc6" FOREIGN KEY (scuola) REFERENCES public.scuola(codice);


--
-- PostgreSQL database dump complete
--
