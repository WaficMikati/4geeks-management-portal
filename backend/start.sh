#!/usr/bin/env bash

flask db upgrade
python seed_db.py
gunicorn run:app