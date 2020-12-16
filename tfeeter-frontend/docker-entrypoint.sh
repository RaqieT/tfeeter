#!/bin/sh

set -e

envsubst < /var/www/assets/app-config.json.template > /var/www/assets/app-config.json

exec "$@";
