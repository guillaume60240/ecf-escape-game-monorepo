#!/bin/bash
set -eu
cd "$(dirname "$0")"

# generate the database for the e2e-env
# skip the rights attribution
cat public/*.sql user-manager/*.sql game-manager/*.sql scenario-manager/*.sql booking-manager/*.sql faq-manager/*.sql insert-data/*.sql\
  | psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"
