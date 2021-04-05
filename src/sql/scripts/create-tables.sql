--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.14
-- Dumped by pg_dump version 9.3.14
-- Started on 2021-04-04 17:16:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.activity DROP CONSTRAINT activity_id;
ALTER TABLE public.activity ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.activity_id2_seq;
DROP TABLE public.activity;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 1939 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1 (class 3079 OID 11750)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1940 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 16859)
-- Name: activity; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE activity (
    id integer NOT NULL,
    account_id text,
    ship_id text,
    date timestamp without time zone
);


--
-- TOC entry 172 (class 1259 OID 16864)
-- Name: activity_id2_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE activity_id2_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1941 (class 0 OID 0)
-- Dependencies: 172
-- Name: activity_id2_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE activity_id2_seq OWNED BY activity.id;


--
-- TOC entry 1824 (class 2604 OID 16866)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity ALTER COLUMN id SET DEFAULT nextval('activity_id2_seq'::regclass);


--
-- TOC entry 1826 (class 2606 OID 16872)
-- Name: activity_id; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_id PRIMARY KEY (id);


-- Completed on 2021-04-04 17:16:08

--
-- PostgreSQL database dump complete
--

