"""
Tests for nmap parser in attack path service.
These are pure unit tests - no DB or API required.
"""
import pytest
from app.services.attack_path_service import parse_nmap_output, _parse_manual_findings


def test_parse_standard_nmap():
    nmap_output = """
Starting Nmap 7.92
22/tcp   open  ssh     OpenSSH 7.4p1 Ubuntu 10+deb9u7 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    nginx 1.18.0
443/tcp  open  ssl/http Apache httpd 2.4.41 ((Ubuntu))
3306/tcp open  mysql   MySQL 5.7.36
"""
    services = parse_nmap_output(nmap_output)
    assert len(services) == 4

    ssh = next(s for s in services if s.port == 22)
    assert ssh.service == "ssh"
    assert "OpenSSH" in ssh.version

    nginx = next(s for s in services if s.port == 80)
    assert nginx.service == "http"

    apache = next(s for s in services if s.port == 443)
    assert apache.service == "http"  # ssl/http → http

    mysql = next(s for s in services if s.port == 3306)
    assert mysql.service == "mysql"
    assert "5.7" in mysql.version


def test_parse_empty_nmap():
    services = parse_nmap_output("")
    assert services == []


def test_parse_manual_findings():
    text = "Port 22 open (OpenSSH 7.2)\nPort 80 open (nginx 1.18)\nPort 443 open (Apache 2.4)"
    services = _parse_manual_findings(text)
    assert len(services) == 3

    ports = {s.port for s in services}
    assert {22, 80, 443} == ports


def test_parse_single_service():
    nmap = "9200/tcp open  http    Elasticsearch httpd"
    services = parse_nmap_output(nmap)
    assert len(services) == 1
    assert services[0].port == 9200
